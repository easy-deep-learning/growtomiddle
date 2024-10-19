'use client'

import { useEffect, useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { IUser } from '@/database/types/User'
import { type IRole } from '@/database/types/Role'

const GET_USERS_AND_ROLES = gql`
  #graphql
  query GetUsersAndRoles {
    users {
      _id
      name
      image
      role {
        _id
        name
      }
    }
    roles {
      _id
      name
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUser($user: UserInput!) {
    updateUser(user: $user) {
      _id
      name
      role {
        _id
        name
      }
    }
  }
`

const AdminPage: NextPage = () => {
  const router = useRouter()
  const { status } = useSession()
  const { loading, error, data, refetch } = useQuery(GET_USERS_AND_ROLES)
  const [updateUser] = useMutation(UPDATE_USER)

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin?returnTo=/admin')
    }
  }, [status, router])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId)
  }

  const handleSaveRoles = async () => {
    if (selectedUser) {
      await updateUser({
        variables: {
          user: {
            _id: selectedUser._id,
            role: selectedRole,
          },
        },
      })
      await refetch()
      setSelectedUser(null)
      setSelectedRole('')
    }
  }

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
        <section>
          <h2>Users</h2>
          <ul>
            {data?.users.map((user: IUser) => (
              <li key={user._id}>
                <Image
                  src={user.image}
                  alt={user.name}
                  width={50}
                  height={50}
                />
                <p>{user.name}</p>
                <p>Role: {user.role?.name}</p>
                <button
                  onClick={() => {
                    setSelectedUser(user)
                    setSelectedRole(user.role?._id || '')
                  }}
                >
                  Edit Role
                </button>
              </li>
            ))}
          </ul>
          {selectedUser && (
            <div>
              <h3>Edit Roles for {selectedUser.name}</h3>
              <ul>
                {data?.roles.map((role: IRole) => (
                  <li key={role._id}>
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value={role._id}
                        checked={selectedRole === role._id}
                        onChange={() => handleRoleChange(role._id)}
                      />
                      {role.name}
                    </label>
                  </li>
                ))}
              </ul>
              <button onClick={handleSaveRoles}>Save</button>
              <button onClick={() => setSelectedUser(null)}>Cancel</button>
            </div>
          )}
        </section>
        <h2>Users</h2>
      </main>
    </div>
  )
}

export default AdminPage
