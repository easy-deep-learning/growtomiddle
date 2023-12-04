'use client'

import { NextPage } from 'next'
import { gql, useMutation } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { IProject } from '@/database/models/Project'
import { FormEvent } from 'react'
import { IFeature } from '@/database/models/Feature'

const GET_PROJECT = gql`
    #graphql
    query GetProject($id: ID!) {
        project(id: $id) {
            _id
            name
            description
            features {
                _id
                name
            }
        }
    }
`

const ADD_FEATURE = gql`
    #graphql
    mutation AddFeature($projectId: ID!, $feature: FeatureInput) {
        addFeature(projectId: $projectId, feature: $feature) {
            _id
            name
            description
            features {
                _id
                name
            }
        }
    }
`

type PageParams = {
  params: { project_id: string };
};

const ProjectPage: NextPage<PageParams> = (context) => {
  const { data }: { data: { project: IProject } } = useSuspenseQuery(GET_PROJECT, { variables: { id: context.params.project_id } })
  const [addFeature] = useMutation(ADD_FEATURE)

  const handleAddFeature = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body = Object.fromEntries(formData)
    const response = await addFeature({
      variables: {
        projectId: context.params.project_id,
        feature: body,
      },
    })
    console.log('response: ', response) // eslint-disable-line
  }

  return (
    <div>
      <h1>{data.project.name}</h1>
      <div>{data.project.description}</div>

      <h3>Features</h3>
      <div>
        <form
          action={`/api/project/${context.params.project_id}/feature`}
          method="POST"
          onSubmit={handleAddFeature}
        >
          <p>add feature</p>
          <input name="name" />
          <button type="submit">Add</button>
        </form>
      </div>
      <h4>features list:</h4>
      {data.project.features?.length > 0 && (
        <ul>
          {data.project.features.map((feature) => {
            return (
              <li key={feature._id}>
                <p>{feature.name}</p>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ProjectPage
