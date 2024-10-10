'use client'

import { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import Head from 'next/head'
import { NextPage } from 'next'

import { type IRole } from '@/database/models/Role'

enum Permission {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}

const GET_ROLES = gql`
  query GetRoles {
    roles {
      _id
      name
      permissions
    }
  }
`

const CREATE_ROLE = gql`
  mutation CreateRole($input: RoleCreateInput!) {
    createRole(input: $input) {
      _id
      name
      permissions
    }
  }
`

const UPDATE_ROLE = gql`
  mutation UpdateRole($id: ID!, $input: RoleUpdateInput!) {
    updateRole(id: $id, input: $input) {
      _id
      name
      permissions
    }
  }
`

const DELETE_ROLE = gql`
  mutation DeleteRole($id: ID!) {
    deleteRole(id: $id) {
      _id
    }
  }
`

const AdminRolesPage: NextPage = () => {
  const { loading, error, data } = useQuery(GET_ROLES)
  const [createRole] = useMutation(CREATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  })
  const [updateRole] = useMutation(UPDATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  })
  const [deleteRole] = useMutation(DELETE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  })

  const [roleName, setRoleName] = useState('')
  const [rolePermissions, setRolePermissions] = useState<Permission[]>([])
  const [editingRole, setEditingRole] = useState<IRole | null>(null)

  const handlePermissionChange = (permission: Permission) => {
    setRolePermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((perm) => perm !== permission)
        : [...prevPermissions, permission]
    )
  }

  const handleCreateOrUpdateRole = async () => {
    if (editingRole) {
      await updateRole({
        variables: {
          id: editingRole._id,
          input: { name: roleName, permissions: rolePermissions },
        },
      })
    } else {
      await createRole({
        variables: {
          input: { name: roleName, permissions: rolePermissions },
        },
      })
    }
    setRoleName('')
    setRolePermissions([])
    setEditingRole(null)
  }

  const handleEditRole = (role: IRole) => {
    setEditingRole(role)
    setRoleName(role.name)
    setRolePermissions(role.permissions)
  }

  const handleDeleteRole = async (id: string) => {
    await deleteRole({ variables: { id } })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <Head>
        <title>Admin Roles</title>
        <meta name="description" content="Admin page for managing roles" />
      </Head>
      <main>
        <h1>Manage Roles</h1>
        <section>
          <h2>{editingRole ? 'Edit Role' : 'Add Role'}</h2>
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
          <button onClick={handleCreateOrUpdateRole}>
            {editingRole ? 'Update Role' : 'Create Role'}
          </button>
          {editingRole && (
            <button onClick={() => setEditingRole(null)}>Cancel</button>
          )}
        </section>
        <section>
          <h2>Roles</h2>
          <ul>
            {data?.roles.map((role: IRole) => (
              <li key={role._id}>
                <p>{role.name}</p>
                <p>{role.permissions.join(', ')}</p>
                <button onClick={() => handleEditRole(role)}>Edit</button>
                <button onClick={() => handleDeleteRole(role._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default AdminRolesPage
