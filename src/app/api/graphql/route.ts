import { MongoError } from 'mongodb'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'

import mongooseConnect from '@/database/mongooseConnect'
import ProjectModel, { IProject } from '@/database/models/Project'
import FeatureModel, { IFeature } from '@/database/models/Feature'
import UserModel, { IUser } from '@/database/models/User'
import RoleModel, { IRole, Permission } from '@/database/models/Role'
import { getSessionTokenName } from '@/utils/getSessionTokenName'
import SessionModel from '@/database/models/Session'

type Context = {
  user: IUser & { role: IRole }
}

const resolvers = {
  Query: {
    projects: async () => {
      const result = await ProjectModel.find({})
      return result
    },
    project: async (_parent: any, { id }: { id: string }) => {
      return ProjectModel.findById(id).populate('features')
    },

    feature: async (_parent: any, { id }: { id: string }) => {
      return FeatureModel.findById(id)
    },

    users: async () => {
      return UserModel.find({}).populate('role')
    },

    roles: async () => {
      return RoleModel.find({})
    },
  },
  Mutation: {
    createProject: async (_parent: any, { project }: { project: IProject }) => {
      const newProject = new ProjectModel(project)
      return await newProject.save()
    },
    updateProject: async (
      _parent: any,
      { id, project }: { id: string; project: IProject }
    ) => {
      await ProjectModel.updateOne({ _id: id }, project)
      return await ProjectModel.findById(id)
    },

    addFeature: async (
      _parent: any,
      { projectId, feature }: { projectId: string; feature: IFeature }
    ) => {
      const newFeature = new FeatureModel(feature)
      await newFeature.save()
      await ProjectModel.updateOne(
        { _id: projectId },
        { $push: { features: newFeature._id } }
      )
      return await ProjectModel.findById(projectId).populate('features')
    },

    updateUser: async (
      _parent: any,
      { user }: { user: { _id: string; name: string; role: string[] } },
      context: any
    ) => {
      const dataForUpdate = { name: user.name, role: user.role }
      return await UserModel.findByIdAndUpdate(user._id, dataForUpdate)
    },

    createRole: async (
      _parent: any,
      { input }: { input: { name: string; permissions: string[] } },
      { user }: Context
    ) => {
      if (!user) {
        throw new Error('Not authenticated')
      } else if (
        !user.role?.permissions.some(
          (permission: Permission) =>
            permission.resource === 'role' &&
            permission.actions.includes(Permission.create)
        )
      ) {
        throw new Error('Not authorized')
      }

      try {
        const newRole = new RoleModel(input)
        await newRole.save()
        return newRole
      } catch (error) {
        if (error instanceof MongoError && error.code === 11000) {
          throw new Error('Role already exists')
        }
        console.error('Error creating role: ', error)
        throw new Error('Failed to create user role')
      }
    },
    updateRole: async (
      _parent: any,
      { id, input }: { id: string; input: any },
      { user }: Context
    ) => {
      if (!user) {
        throw new Error('Not authenticated')
      } else if (
        !user.role?.permissions.some(
          (permission: Permission) =>
            permission.resource === 'role' &&
            permission.actions.includes(Permission.update)
        )
      ) {
        throw new Error('Not authorized')
      }

      try {
        await RoleModel.updateOne({ _id: id }, input)
        return await RoleModel.findById(id)
      } catch (error) {
        console.error('Error updating role:', error)
        throw new Error('Failed to update role')
      }
    },
    deleteRole: async (
      _parent: any,
      { id }: { id: string },
      { user }: Context
    ) => {
      if (!user) {
        throw new Error('Not authenticated')
      } else if (
        !user.role?.permissions.some(
          (permission: Permission) =>
            permission.resource === 'role' &&
            permission.actions.includes(Permission.delete)
        )
      ) {
        throw new Error('Not authorized')
      }
      try {
        const result = await RoleModel.deleteOne({ _id: id })
        if (result.deletedCount === 0) {
          throw new Error('Role not found')
        }
        return { _id: id }
      } catch (error) {
        console.error('Error deleting role:', error)
        throw new Error('Failed to delete role')
      }
    },
  },
}

const typeDefs = gql`
  #graphql
  type Query {
    projects: [Project]
    project(id: ID!): Project

    feature(id: ID!): Feature

    users: [User]

    roles: [Role]
  }

  type Mutation {
    createProject(project: ProjectInput): Project
    updateProject(id: ID!, project: ProjectInput): Project

    updateUser(user: UserInput): User

    addFeature(projectId: ID!, feature: FeatureInput): Project

    createRole(input: RoleInput!): Role
    updateRole(id: ID!, input: RoleInput!): Role
    deleteRole(id: ID!): RoleId
  }

  type Role {
    _id: ID
    name: String
    permissions: [Permission]
  }

  type Permission {
    actions: [Action]
    resource: Resources
  }

  type RoleId {
    _id: ID
  }

  input RoleInput {
    name: String
    permissions: [Permission]!
  }

  type User {
    _id: ID
    name: String
    email: String
    image: String
    role: Role
  }

  input UserInput {
    _id: ID
    name: String
    role: ID
  }

  type Project {
    _id: ID
    name: String
    description: String
    features: [Feature]
    url: String
  }

  input ProjectInput {
    name: String
    description: String
    url: String
  }

  type Feature {
    _id: ID
    name: String
    description: String
    tasks: [Task]
  }

  input FeatureInput {
    name: String
    description: String
    url: String
  }

  type Task {
    _id: ID
    name: String
    description: String
    skills: [Skill]
  }

  type Skill {
    _id: ID
    name: String
    description: String
    materials: [Material]
  }

  type Material {
    _id: ID
    name: String
    type: MaterialType
    description: String
    url: String
  }

  enum MaterialType {
    article
    book
    course
    documentation
    example
    video
    podcast
  }

  enum Action {
    create
    read
    update
    delete
  }

  enum Resource {
    role
    user
    task
    skill
    material
    project
  }
`

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (nextApiRequest) => {
    await mongooseConnect()
    const sessionTokenName = getSessionTokenName()
    // TODO: Fix this type casting
    const sessionId = (
      nextApiRequest.cookies?._parsed as unknown as Map<
        string,
        { name: string; value: string }
      >
    )?.get(sessionTokenName)?.value
    const session = await SessionModel.findOne({ sessionToken: sessionId })
    const user = await UserModel.findById(session?.userId).populate('role')
    return { user }
  },
})

export { handler as GET, handler as POST }
