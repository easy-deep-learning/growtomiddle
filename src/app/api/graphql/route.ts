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
      return UserModel.find({})
    },
    roles: async () => {
      return UserRoleModel.find({})
    },
  },
  Mutation: {
    createProject: async (parent: any, { project }: { project: IProject }) => {
      const newProject = new ProjectModel(project)
      console.log('newProject:', newProject)
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
    createUserRole: async (
      _: any,
      { input }: { input: { name: string; permissions: string[] } }
    ) => {
      try {
        console.log('input: ', input)
        const newRole = new UserRoleModel(input)
        return await newRole.save()
      } catch (error) {
        console.error('error: ', error)
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
    addFeature(projectId: ID!, feature: FeatureInput): Project
    createUserRole(input: UserRoleInput!): UserRole
  }

  type UserRole {
    _id: ID
    name: String
    permissions: Permission
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

  input UserRoleInput {
    name: String!
    permissions: [String]!
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
    write
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
