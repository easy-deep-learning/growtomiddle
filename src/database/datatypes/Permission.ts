export enum Action {
  READ = 'READ',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export enum Resource {
  VACANCY = 'VACANCY',
  USER = 'USER',
  ROLE = 'ROLE',
}

export type Permission = {
  actions: Action[];
  resource: Resource;
};
