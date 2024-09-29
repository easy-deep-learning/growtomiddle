'use client'

import { useEffect, useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { IUser } from '@/database/models/User'

const GET_USERS_AND_ROLES = gql`
  #graphql
  query GetUsers {
    users {
      _id
      name
      image
      roles {
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

const UPDATE_USER_ROLES = gql`
  mutation UpdateUserRoles($input: UpdateUserRolesInput!) {
    updateUserRoles(input: $input) {
      _id
      roles {
        _id
        name
      }
    }
  }
`

const AdminPage: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { loading, error, data } = useQuery(GET_USERS_AND_ROLES)
  const [updateUserRoles] = useMutation(UPDATE_USER_ROLES)

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin?returnTo=/admin')
    }
  }, [status, router])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleRoleChange = (userId: string, roleId: string) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(roleId)
        ? prevRoles.filter((id) => id !== roleId)
        : [...prevRoles, roleId]
    )
  }

  const handleSaveRoles = async () => {
    if (selectedUser) {
      await updateUserRoles({
        variables: {
          input: {
            userId: selectedUser._id,
            roleIds: selectedRoles,
          },
        },
      })
      setSelectedUser(null)
      setSelectedRoles([])
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
        <h2>Users</h2>
        <ul>
          {data?.users.map((user: IUser) => (
            <li key={user._id}>
              <Image src={user.image} alt={user.name} width={50} height={50} />
              <p>{user.name}</p>
              <button
                onClick={() => {
                  setSelectedUser(user)
                  setSelectedRoles(user.roles.map((role) => role._id))
                }}
              >
                Edit Roles
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
                      type="checkbox"
                      checked={selectedRoles.includes(role._id)}
                      onChange={() =>
                        handleRoleChange(selectedUser._id, role._id)
                      }
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
      </main>
    </div>
  )
}

export default AdminPage
