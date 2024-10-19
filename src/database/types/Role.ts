import { type Document } from 'mongoose'

export enum Action {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}

export enum Resource {
  _own = '_own',
  role = 'role',
  user = 'user',
  task = 'task',
  skill = 'skill',
  material = 'material',
  project = 'project',
}

export type Permission = {
  actions: Action[]
  resource: Resource
}

export type IRole = {
  _id: string
  name: string
  permissions: {
    actions: Action[]
    resource: Resource
  }[]
}

export interface IRoleDocument extends Omit<IRole, '_id'>, Document {}
