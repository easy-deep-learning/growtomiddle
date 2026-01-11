import { isValidObjectId } from 'mongoose';

import { mongoDocToFrontend } from '@/utils/mongo-doc-to-frontend';
import VacancyModel, { Vacancy } from '@/database/models/Vacancy';
import mongooseConnect from '@/database/mongooseConnect';
import { auth } from '@/auth';

export const getAll = async (params: { page: number; limit: number }) => {
  await mongooseConnect();

  const session = await auth();
  console.log('>>> session', session);

  const docs = await VacancyModel.find()
    .sort({ createdAt: -1 })
    .skip((params.page - 1) * params.limit)
    .limit(params.limit)
    .lean();

  return docs.map(mongoDocToFrontend);
};

export const getById = async (id: string) => {
  await mongooseConnect();

  const session = await auth();
  console.log('>>> session', session);

  if (!isValidObjectId(id)) {
    return null;
  }

  const doc = await VacancyModel.findById(id).lean();
  return doc ? mongoDocToFrontend(doc) : null;
};

export const create = async (data: Omit<Vacancy, 'id' | 'createdAt' | 'updatedAt'>) => {
  await mongooseConnect();

  const session = await auth();
  console.log('>>> session', session);

  const doc = await VacancyModel.create(data);
  return mongoDocToFrontend(doc);
};

export const updateById = async (
  id: string,
  data: Omit<Vacancy, 'id' | 'createdAt' | 'updatedAt'>
) => {
  await mongooseConnect();

  const session = await auth();
  console.log('>>> session', session);

  const vacancy = await VacancyModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
  return vacancy ? mongoDocToFrontend(vacancy) : null;
};

export const deleteById = async (id: string) => {
  await mongooseConnect();

  const session = await auth();
  console.log('>>> session', session);

  const vacancy = await VacancyModel.findByIdAndDelete(id).lean();
  return vacancy ? mongoDocToFrontend(vacancy) : null;
};
