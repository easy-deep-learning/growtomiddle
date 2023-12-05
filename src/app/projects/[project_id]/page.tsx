'use client'

import { FormEvent } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { gql, useMutation, useQuery } from '@apollo/client'

import { IProject } from '@/database/models/Project'

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
  const { loading, error, data } = useQuery<{ project: IProject }>(GET_PROJECT, { variables: { id: context.params.project_id } })
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
  }

  if (error) {
    return <div>error</div>
  }

  if (loading) {
    return <div>loading</div>
  }

  if (!data?.project) {
    return <div>not found</div>
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
                <Link href={`/projects/${data.project._id}/features/${feature._id}`}>{feature.name}</Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ProjectPage
