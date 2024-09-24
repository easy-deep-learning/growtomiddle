'use client'

import { useQuery, gql } from '@apollo/client'
import { NextPage } from 'next'
import Head from 'next/head'

import { IUser } from '@/database/models/User'

const GET_USERS = gql`
  #graphql
  query GetUsers {
    users {
      _id
      name
      image
    }
  }
`

const AdminPage: NextPage = () => {
  const { loading, error, data } = useQuery<{ users: IUser[] }>(GET_USERS)

  console.log('data: ', data)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <Head>
        <title>Admin Page</title>
        <meta
          name="description"
          content="Admin page for managing the application"
        />
      </Head>
      <main>
        <h1>Welcome to the Admin Page</h1>
        {/* Add your admin components here */}
      </main>
    </div>
  )
}

export default AdminPage
