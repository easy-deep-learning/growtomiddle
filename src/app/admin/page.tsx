'use client'

import { useEffect, useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { IUser } from '@/database/models/User'
import { type IUserRole } from '@/database/models/UserRole'

enum Permission {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

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

const CREATE_ROLE = gql`
  mutation createUserRole($input: UserRoleInput!) {
    createRole(input: $input) {
      _id
      name
      permissions
    }
  }
`

const AdminPage: NextPage = () => {
  const router = useRouter()
  const { status } = useSession()
  const { loading, error, data } = useQuery(GET_USERS_AND_ROLES)
  const [updateUserRoles] = useMutation(UPDATE_USER_ROLES)
  const [createRole] = useMutation(CREATE_ROLE, {
    refetchQueries: [{ query: GET_USERS_AND_ROLES }],
  })

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [roleName, setRoleName] = useState('')
  const [rolePermissions, setRolePermissions] = useState<Permission[]>([])

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

  const handlePermissionChange = (permission: Permission) => {
    setRolePermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((perm) => perm !== permission)
        : [...prevPermissions, permission]
    )
  }

  const handleCreateRole = async () => {
    await createRole({
      variables: {
        input: { name: roleName, permissions: rolePermissions },
      },
    })
    setRoleName('')
    setRolePermissions([])
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
          <h2>Roles</h2>
          <h3>Add Role</h3>
          <div>
            <label htmlFor="roleName">Role Name</label>
            <input
              type="text"
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          <div>
            <h3>Permissions</h3>
            {Object.values(Permission).map((permission) => (
              <label key={permission}>
                <input
                  type="checkbox"
                  checked={rolePermissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
                {permission}
              </label>
            ))}
          </div>
          <button onClick={handleCreateRole}>Create Role</button>
          <ul>
            {data?.roles.map((role: IUserRole) => (
              <li key={role._id}>
                <p>{role.name}</p>
              </li>
            ))}
          </ul>
        </section>
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
                {data?.roles.map((role: IUserRole) => (
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
        </section>
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
      </main>
    </div>
  )
}

export default AdminPage
