'use client'

import { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { IUser } from '@/database/models/User'

const GET_USERS = gql`
  #graphql
  query GetUsers {
    users {
      _id
      name
      image
      roles {
        name
        permissions
      }
    }
  }
`

const AdminPage: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin?returnTo=/admin')
    }
  }, [status, router])

  const { loading, error, data } = useQuery<{ users: IUser[] }>(GET_USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  console.log('data: ', data)

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
        <h2>Users</h2>
        <ul>
          {data?.users.map((user) => (
            <li key={user._id}>
              <Image src={user.image} alt={user.name} width={50} height={50} />
              <p>{user.name}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default AdminPage
