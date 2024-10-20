import { ObjectId } from 'mongoose'

import { ResourceName, Action, Permission, IRole } from '@/database/types/Role'
import { IUserWithRole } from '@/database/types/User'

export const isAuthorized = ({
  user,
  resourceName,
  resourceAuthorId,
  action,
}: {
  user?: { _id: ObjectId; role: IRole } | null
  resourceName: ResourceName
  resourceAuthorId?: ObjectId
  action: Action
}) => {
  const isOwner = resourceAuthorId?.toString() === user?._id.toString()
  const ownerAllowedActions =
    user?.role?.permissions?.find(
      (permission) => permission.resource === ResourceName._own
    )?.actions || []

  return (
    (isOwner && ownerAllowedActions.includes(action)) ||
    user?.role?.permissions?.some(
      (permission: Permission) =>
        permission.resource === resourceName &&
        permission.actions.includes(action)
    )
  )
}
