import mongooseConnect from '../database/mongooseConnect'
import UserModel from '../database/models/User'

async function getUserById(userId: string) {
  try {
    await mongooseConnect()
    const user = await UserModel.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

getUserById('66f5a0d1d72e444d6a7e01df').then((user) => {
  console.log('user:', user)
  return
})
