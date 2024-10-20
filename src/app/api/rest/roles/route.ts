import { NextRequest, NextResponse } from 'next/server'

import RoleModel from '@/database/models/Role'
import { Action, IRoleDocument, ResourceName } from '@/database/types/Role'
import mongooseConnect from '@/database/mongooseConnect'
import { isAuthorized } from '@/utils/isAuthorized'
import { getUserFromRequest } from '@/utils/getUserFromRequest'

export const GET = async (request: NextRequest) => {
  try {
    const user = await getUserFromRequest(request)
    if (
      !user ||
      !isAuthorized({
        user,
        resourceName: ResourceName.role,
        action: Action.read,
      })
    ) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }
    await mongooseConnect()
    const roles: IRoleDocument[] = await RoleModel.find({})
    return NextResponse.json({ data: roles }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const user = await getUserFromRequest(request)
    if (
      !user ||
      !isAuthorized({
        user,
        resourceName: ResourceName.role,
        action: Action.create,
      })
    ) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }
    await mongooseConnect()
    const { name, permissions } = await request.json()
    const role = await RoleModel.create({ name })
    if (permissions?.length > 0) {
      role.permissions = permissions
    }
    role.save()
    const createdRole = await RoleModel.findById(role._id)
    return NextResponse.json({ data: createdRole }, { status: 201 })
  } catch (error: any) {
    let errorMessage = 'Internal Server Error'
    let statusCode = 500
    if (error.code === 11000) {
      errorMessage = 'Role already exists'
      statusCode = 409
    }
    return NextResponse.json({ error: errorMessage }, { status: statusCode })
  }
}
