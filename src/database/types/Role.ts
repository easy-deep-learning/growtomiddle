import type { ObjectId, Document } from 'mongoose'

export enum Action {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}

export enum ResourceName {
  _own = '_own',
  role = 'role',
  user = 'user',
  task = 'task',
  skill = 'skill',
  material = 'material',
  project = 'project',
  feature = 'feature',
}

export type Permission = {
  actions: Action[]
  resource: ResourceName
}

export type IRole = {
  _id: ObjectId
  name: string
  permissions: {
    actions: Action[]
    resource: ResourceName
  }[]
}

export interface IRoleDocument extends IRole, Document<ObjectId> {}
