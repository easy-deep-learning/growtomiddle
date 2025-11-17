'use client';

import type { IFeature } from '@/database/models/Feature';
import { gql, useQuery } from '@apollo/client';
import { NextPage } from 'next';

const GET_FEATURE = gql`
  #graphql
  query GetFeature($id: ID!) {
    feature(id: $id) {
      _id
      name
      description
      tasks {
        _id
        name
      }
    }
  }
`;

type PageParams = {
  params: {
    project_id: string;
    feature_id: string;
  };
};

const FeaturePage: NextPage<PageParams> = (context) => {
  const { loading, error, data } = useQuery<{ feature: IFeature }>(GET_FEATURE, {
    variables: { id: context.params.feature_id },
  });

  if (error) {
    console.log('error: ', error); // eslint-disable-line
    return <div>{error.message}</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  if (!data?.feature) {
    return <div>not found</div>;
  }

  return (
    <div>
      <h1>{data.feature.name}</h1>
      <div>{data.feature.description}</div>
    </div>
  );
};

export default FeaturePage;
