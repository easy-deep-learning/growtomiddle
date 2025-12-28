import { auth } from '@/auth';

import { Role } from '@/database/datatypes/Role';
import RoleModel from '@/database/models/Role';
import mongooseConnect from '@/database/mongooseConnect';

type GetAllParams = {
  page?: number;
  limit?: number;
  sort?: string;
};

const DEFAULT_LIMIT = 25;

export const getAll = async (
  params: GetAllParams = { page: 0, limit: DEFAULT_LIMIT, sort: 'createdAt' }
) => {
  await mongooseConnect();

  const session = await auth();
  // Optionally do something with the session here

  const query = RoleModel.find();

  if (params?.limit) {
    query.limit(params.limit);
  }

  if (params?.page) {
    query.skip((params.page - 1) * (params.limit ?? DEFAULT_LIMIT));
  }

  if (params?.sort) {
    query.sort(params.sort);
  }

  return await query.lean();
};

/**
 * Get a single Role by ID
 */
export const getById = async (id: string) => {
  await mongooseConnect();

  const session = await auth();
  // Optionally do something with the session here

  return await RoleModel.findById(id).lean();
};

/**
 * Create a new Role
 */
export const create = async (data: any) => {
  await mongooseConnect();

  const session = await auth();
  // Optionally do something with the session here

  const doc = new RoleModel(data);
  await doc.save();
  return doc;
};

/**
 * Update a Role by ID
 */
export const update = async (id: string, data: any) => {
  await mongooseConnect();

  const session = await auth();
  // Optionally do something with the session here

  return await RoleModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
};

/**
 * Delete a Role by ID
 */
export const remove = async (id: string) => {
  await mongooseConnect();

  const session = await auth();
  // Optionally do something with the session here

  return await RoleModel.findByIdAndDelete(id).lean();
};
