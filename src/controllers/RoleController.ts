import { auth } from '@/auth';

import { Role } from '@/database/datatypes/Role';
import RoleModel from '@/database/models/Role';
import mongooseConnect from '@/database/mongooseConnect';

// Get all Roles with pagination
export const getAll = async (params: { page: number; limit: number }) => {
  await mongooseConnect();

  const session = await auth();
  // Optionally do something with the session here

  return await RoleModel.find()
    .sort({ createdAt: -1 })
    .skip((params.page - 1) * params.limit)
    .limit(params.limit)
    .lean();
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
 * Create multiple Roles
 */
export const createMany = async (data: Omit<Role, '_id' | 'createdAt' | 'updatedAt'>[]) => {
  await mongooseConnect();

  const session = await auth();

  const result = await RoleModel.insertMany(data);
  return result;
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
