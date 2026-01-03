import { isValidObjectId } from 'mongoose';

import { mongoDocToFrontend } from '@/utils/mongo-doc-to-frontend';
import VacancyModel from '@/database/models/Vacancy';
import mongooseConnect from '@/database/mongooseConnect';
import { auth } from '@/auth';

export const getAll = async (params: { page: number; limit: number }) => {
  await mongooseConnect();

  const session = await auth();
  console.log('>>> session', session);

  return await VacancyModel.find()
    .sort({ createdAt: -1 })
    .skip((params.page - 1) * params.limit)
    .limit(params.limit)
    .lean()
    .transform((docs) => docs.map(mongoDocToFrontend));
};

export const getById = async (id: string) => {
  await mongooseConnect();

  const session = await auth();
  console.log('>>> session', session);

  if (!isValidObjectId(id)) {
    return null;
  }

  return await VacancyModel.findById(id).lean().transform(mongoDocToFrontend);
};
