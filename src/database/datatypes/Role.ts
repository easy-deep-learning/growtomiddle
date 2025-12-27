import { Action, Resource } from './Permission';

export type Role = {
  _id: string;
  name: string;
  permissions: {
    actions: Action[];
    resource: Resource;
  }[];
  createdAt: string;
  updatedAt: string;
};
