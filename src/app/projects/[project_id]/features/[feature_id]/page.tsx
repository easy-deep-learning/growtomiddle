'use client'

import { NextPage } from 'next'
import { gql, useMutation, useQuery } from '@apollo/client'
import type { IFeature } from '@/database/models/Feature'
import { kMaxLength } from 'buffer'

const GET_PROJECT = gql`
    #graphql
    query GetFeature($id: ID!) {
        getFeature(id: $id) {
            _id
            name
            description
            tasks {
                _id
                name
            }
        }
    }
`

type PageParams = {
  params: {
    project_id: string,
    feature_id: string,
  };
};

const FeaturePage: NextPage<PageParams> = (context) => {
  const { loading, error, data } = useQuery<{ feature: IFeature }>(GET_PROJECT, { variables: { id: context.params.feature_id } })

  if (error) {
    console.log("error: ", error); // eslint-disable-line
    return <div>{error.message}</div>
  }

  if (loading) {
    return <div>loading</div>
  }

  if (!data?.feature) {
    return <div>not found</div>
  }
  
  console.log("data: ", data); // eslint-disable-line

  return (
    <div>
      <h1>{data.feature.name}</h1>
      <div>{data.feature.description}</div>
    </div>
  )
}

export default FeaturePage
