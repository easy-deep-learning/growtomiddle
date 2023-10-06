import mongoose from 'mongoose'

export interface ISession extends mongoose.Document {
  sessionToken: string,
  userId: mongoose.Types.ObjectId,
  expires: Date,
}

/**
 * @see https://next-auth.js.org/adapters/mongodb
 */
const Schema = new mongoose.Schema<ISession>({
  sessionToken: String,
  userId: mongoose.Types.ObjectId,
  expires: Date
})

const SessionModel = mongoose.models.Session || mongoose.model('Session', Schema)

export default SessionModel
