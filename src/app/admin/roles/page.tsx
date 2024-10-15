'use client'

import { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import Head from 'next/head'
import { NextPage } from 'next'

import { Action, Permission, Resource, IRole } from '@/database/types/Role'

const removeTypename = (key: string, value: any) =>
  key === '__typename' ? undefined : value

const cleanVariables = (variables: any) =>
  JSON.parse(JSON.stringify(variables), removeTypename)

const GET_ROLES = gql`
  query GetRoles {
    roles {
      _id
      name
      permissions {
        actions
        resource
      }
    }
  }
`

const CREATE_ROLE = gql`
  mutation CreateRole($role: RoleInput!) {
    createRole(role: $role) {
      _id
      name
      permissions
    }
  }
`

const UPDATE_ROLE = gql`
  mutation UpdateRole($id: ID!, $role: RoleInput!) {
    updateRole(id: $id, role: $role) {
      _id
      name
      permissions {
        actions
        resource
      }
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

  const handleRolePermissionChange = ({
    resource,
    action,
  }: {
    resource: Resource
    action: Action
  }) => {
    setRolePermissions((prevPermissions) => {
      const existingPermission = prevPermissions.find(
        (prevPermission) => prevPermission.resource === resource
      )
      let updated = false

      const updatedPermissions = prevPermissions.map((prevPermission) =>
        prevPermission.resource === resource
          ? ((updated = true),
            {
              ...prevPermission,
              actions: prevPermission.actions.some(
                (prevPermissionAction) => prevPermissionAction === action
              )
                ? prevPermission.actions.filter(
                    (prevPermissionAction) => prevPermissionAction !== action
                  )
                : [...prevPermission.actions, action],
            })
          : prevPermission
      )

      updated || updatedPermissions.push({ resource, actions: [action] })
      return updatedPermissions ?? [{ resource, actions: [action] }]
    })
  }

  const handleCreateOrUpdateRole = async () => {
    console.log('editingRole: ', editingRole)
    if (editingRole) {
      await updateRole({
        variables: {
          id: editingRole._id,
          role: {
            name: roleName,
            permissions: cleanVariables(rolePermissions),
          },
        },
      })
    } else {
      await createRole({
        variables: {
          role: { name: roleName, permissions: rolePermissions },
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
            {Object.values(Resource).map((resource) => (
              <div key={resource}>
                <h4>{resource}</h4>
                {Object.values(Action).map((action) => (
                  <span key={action}>
                    <label>
                      <input
                        type="checkbox"
                        checked={rolePermissions.some(
                          (permission) =>
                            permission.resource === resource &&
                            permission.actions.includes(action)
                        )}
                        onChange={() =>
                          handleRolePermissionChange({
                            resource,
                            action,
                          })
                        }
                      />
                      {action}
                    </label>
                  </span>
                ))}
              </div>
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
                <h3>{role.name}</h3>
                <p>
                  {role.permissions.map((permission) => (
                    <div key={permission.resource}>
                      <h4>{permission.resource}</h4>
                      <p>{permission.actions.join(', ')}</p>
                    </div>
                  ))}
                </p>
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
