import { ObjectId } from 'mongoose'

import { ResourceName, Action, Permission } from '@/database/types/Role'
import { IUser } from '@/database/types/User'

export const isAuthorized = ({
  user,
  resourceName,
  resourceId,
  action,
}: {
  user: IUser
  resourceName: ResourceName
  resourceId?: ObjectId
  action: Action
}) => {
  const isOwner = resourceId?.toString() === user._id.toString()
  const ownerAllowedActions =
    user?.role?.permissions?.find(
      (permission) => permission.resource === ResourceName._own
    )?.actions || []

  return (
    user?.role?.permissions?.some(
      (permission: Permission) =>
        permission.resource === resourceName &&
        permission.actions.includes(action)
    ) ||
    (isOwner && ownerAllowedActions.includes(action))
  )
}
