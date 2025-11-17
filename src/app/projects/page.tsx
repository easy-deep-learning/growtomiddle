'use client';

import { FC } from 'react';
import { IProject } from '@/database/models/Project';
import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import Link from 'next/link';

const GET_PROJECTS = gql`
  #graphql
  query GetProjects {
    projects {
      _id
      name
      description
    }
  }
`;

type ProjectListPropsType = {
  projects: IProject[];
};

const ProjectList: FC<ProjectListPropsType> = ({ projects }) => {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project._id}>
          <Link href={`/projects/${project._id}`}>{project.name}</Link>
        </li>
      ))}
    </ul>
  );
};

const ProjectsPage: NextPage = () => {
  const { loading, error, data } = useQuery<{ projects: IProject[] }>(GET_PROJECTS);

  if (error) {
    return <div>error</div>;
  }

  if (loading || !data) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <div>
        <Link href="/projects/new">Create a new project</Link>
      </div>
      <ProjectList projects={data.projects} />
    </div>
  );
};

export default ProjectsPage;
