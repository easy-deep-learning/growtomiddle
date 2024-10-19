import { NextResponse } from 'next/server'

import RoleModel from '@/database/models/Role'
import { IRoleDocument } from '@/database/types/Role'
import mongooseConnect from '@/database/mongooseConnect'

export const GET = async (request: Request) => {
  try {
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
