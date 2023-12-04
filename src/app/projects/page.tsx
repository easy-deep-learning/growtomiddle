'use client'

import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { NextPage } from 'next'
import Link from 'next/link'
import { IProject } from '@/database/models/Project'
import { FC } from 'react'

const query = gql`
    #graphql
    query GetProjects {
        projects {
            _id
            name
            description
        }
    }
`

type ProjectListPropsType = {
  projects: IProject[]
}

const ProjectList: FC<ProjectListPropsType> = ({ projects }) => {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project._id}>
          <Link href={`/projects/${project._id}`}>{project.name}</Link>
        </li>
      ))}
    </ul>
  )
}

const ProjectsPage: NextPage = () => {
  const { data }: { data: { projects: IProject[] } } = useSuspenseQuery(query, { variables: {} })

  return (
    <div>
      <h1>Projects</h1>
      <div>
        <Link href="/projects/new">Create a new project</Link>
      </div>
      <ProjectList projects={data.projects} />
    </div>
  )
}

export default ProjectsPage
