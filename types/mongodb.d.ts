import { MongoClient } from 'mongodb'
import { Types } from 'mongoose'
import { ISession } from '@/database/models/session'

declare global {
  var _mongoClientPromise: Promise<MongoClient>

  interface SomeMongooseModelType {
    _id: Types.ObjectId,
    dayNumber: number,
    dayTarget: number, // seconds
    currentProgress: number, // seconds
  }
}
