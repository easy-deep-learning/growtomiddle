import { MongoError } from 'mongodb'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'

import mongooseConnect from '@/database/mongooseConnect'
import ProjectModel, { IProject } from '@/database/models/Project'
import FeatureModel, { IFeature } from '@/database/models/Feature'
import UserModel from '@/database/models/User'
import UserRoleModel from '@/database/models/UserRole'

const resolvers = {
  Query: {
    projects: async () => {
      const result = await ProjectModel.find({})
      console.log('Query, projects:', result)
      return result
    },
    project: async (parent: any, { id }: { id: string }) => {
      return ProjectModel.findById(id).populate('features')
    },
    feature: async (parent: any, { id }: { id: string }) => {
      return FeatureModel.findById(id)
    },
    users: async () => {
      return UserModel.find({}).populate('roles')
    },
    roles: async () => {
      return UserRoleModel.find({})
    },
  },
  Mutation: {
    createProject: async (parent: any, { project }: { project: IProject }) => {
      const newProject = new ProjectModel(project)
      return await newProject.save()
    },
    updateProject: async (
      parent: any,
      { id, project }: { id: string; project: IProject }
    ) => {
      await ProjectModel.updateOne({ _id: id }, project)
      return await ProjectModel.findById(id)
    },
    addFeature: async (
      parent: any,
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
      { user }: { user: { id: string; name: string; roles: string[] } }
    ) => {
      console.log('user: ', user)
      return await UserModel.findByIdAndUpdate(user.id, user)
    },
    updateUserRoles: async (
      _parent: any,
      { user }: { user: { userId: string; roleIds: string[] } }
    ) => {
      const roles = await UserRoleModel.find({ _id: { $in: user.roleIds } })
      console.log('roles: ', roles)
      return await UserModel.findByIdAndUpdate(user.userId, {
        roles: user.roleIds,
      })
    },
    createUserRole: async (
      _parent: any,
      { input }: { input: { name: string; permissions: string[] } }
    ) => {
      try {
        const newRole = new UserRoleModel(input)
        await newRole.save()
        return newRole
      } catch (error) {
        if (error instanceof MongoError && error.code === 11000) {
          throw new Error('Role already exists')
        }
        console.error('error: ', error)
        throw new Error('Failed to create user role')
      }
    },
    updateRole: async (
      parent: any,
      { id, input }: { id: string; input: any }
    ) => {
      try {
        await UserRoleModel.updateOne({ _id: id }, input)
        return await UserRoleModel.findById(id)
      } catch (error) {
        console.error('Error updating role:', error)
        throw new Error('Failed to update role')
      }
    },
    deleteRole: async (parent: any, { id }: { id: string }) => {
      try {
        const result = await UserRoleModel.deleteOne({ _id: id })
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
    roles: [UserRole]
  }

  type Mutation {
    createProject(project: ProjectInput): Project
    updateProject(id: ID!, project: ProjectInput): Project
    updateUser(user: UserInput): User
    updateUserRoles(user: UpdateUserRolesInput!): User
    addFeature(projectId: ID!, feature: FeatureInput): Project
    createUserRole(input: UserRoleCreateInput!): UserRole
    updateRole(id: ID!, input: UserRoleUpdateInput!): UserRole
    deleteRole(id: ID!): UserRoleId
  }

  type UserRole {
    _id: ID
    name: String
    permissions: [Permission]
  }

  type UserRoleId {
    _id: ID
  }

  type User {
    _id: ID
    name: String
    email: String
    image: String
    roles: [UserRole]
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

  input UserInput {
    _id: ID
    name: String
    roles: [ID]
  }

  input UserRoleCreateInput {
    name: String!
    permissions: [String]!
  }

  input UserRoleUpdateInput {
    name: String
    permissions: [String]
  }

  input UpdateUserRolesInput {
    userId: ID!
    roleIds: [ID!]!
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

  enum Permission {
    create
    read
    update
    delete
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
    return { req: { cookies: nextApiRequest.cookies._parsed } }
  },
})

export { handler as GET, handler as POST }
