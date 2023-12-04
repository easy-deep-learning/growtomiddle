'use client'

import { NextPage } from 'next'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { IProject } from '@/database/models/Project'


const query = gql`
    #graphql
    query GetProject($id: ID!) {
        project(id: $id) {
            _id
            name
            description
        }
    }
`

type PageParams = {
  params: { project_id: string };
};

const ProjectPage: NextPage<PageParams> = (context) => {
  const { data }: { data: { project: IProject } } = useSuspenseQuery(query, { variables: { id: context.params.project_id } })

  return (
    <div>
      <h1>{data.project.name}</h1>
      <div>{data.project.description}</div>
    </div>
  )
}

export default ProjectPage
