import FeatureModel, { IFeature } from '@/database/models/Feature';
import ProjectModel, { IProject } from '@/database/models/Project';
import mongooseConnect from '@/database/mongooseConnect';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

const resolvers = {
  Query: {
    projects: async () => {
      await mongooseConnect();
      const result = await ProjectModel.find({});
      return result;
    },
    project: async (parent: any, { id }: { id: string }) => {
      await mongooseConnect();
      return ProjectModel.findById(id).populate('features');
    },
    feature: async (parent: any, { id }: { id: string }) => {
      await mongooseConnect();
      return FeatureModel.findById(id);
    },
  },
  Mutation: {
    createProject: async (parent: any, { project }: { project: IProject }) => {
      await mongooseConnect();
      const newProject = new ProjectModel(project);
      return await newProject.save();
    },
    updateProject: async (parent: any, { id, project }: { id: string; project: IProject }) => {
      await mongooseConnect();
      await ProjectModel.updateOne({ _id: id }, project);
      return await ProjectModel.findById(id);
    },
    addFeature: async (
      parent: any,
      { projectId, feature }: { projectId: string; feature: IFeature }
    ) => {
      await mongooseConnect();
      const newFeature = new FeatureModel(feature);
      await newFeature.save();
      await ProjectModel.updateOne({ _id: projectId }, { $push: { features: newFeature._id } });
      return await ProjectModel.findById(projectId).populate('features');
    },
  },
};

const typeDefs = gql`
  #graphql
  type Query {
    projects: [Project]
    project(id: ID!): Project
    feature(id: ID!): Feature
  }

  type User {
    _id: ID
    name: String
    email: String
    image: String
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

  type Mutation {
    createProject(project: ProjectInput): Project
    updateProject(id: ID!, project: ProjectInput): Project
    addFeature(projectId: ID!, feature: FeatureInput): Project
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
