export enum Action {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}

export enum Resource {
  role = 'role',
  user = 'user',
  task = 'task',
  skill = 'skill',
  material = 'material',
  project = 'project',
}

export type Permission = {
  actions: [Action]
  resource: Resource
}

export type IRole = {
  _id: string
  name: string
  permissions: {
    actions: Permission[]
    resource: Resource
  }[]
}
