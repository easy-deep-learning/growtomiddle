import { NextRequest } from 'next/server'

import SessionModel from '@/database/models/Session'
import UserModel from '@/database/models/User'
import mongooseConnect from '@/database/mongooseConnect'
import { getSessionTokenName } from './getSessionTokenName'
import { IRole } from '@/database/types/Role'

export const getUserFromRequest = async (req: NextRequest) => {
  await mongooseConnect()
  const sessionTokenName = getSessionTokenName()
  const sessionId = req.cookies.get(sessionTokenName)?.value
  const session = await SessionModel.findOne({ sessionToken: sessionId })
  if (!session) return null
  const user = await UserModel.findById(session.userId)
    .populate<{ role: IRole }>('role')
    .lean()
  return user
}
