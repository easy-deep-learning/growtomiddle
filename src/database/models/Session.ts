// Sessions are creating by next-auth.js

import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
  _id: mongoose.Types.ObjectId;
  sessionToken: string;
  userId: mongoose.Types.ObjectId;
  expires: Date;
}

/**
 * @see https://next-auth.js.org/adapters/mongodb
 */
const SessionSchema = new Schema<ISession>({
  sessionToken: String,
  userId: Schema.Types.ObjectId,
  expires: Date,
});

const SessionModel: mongoose.Model<ISession> =
  mongoose.models?.Session || mongoose.model<ISession>('Session', SessionSchema);

export default SessionModel;
