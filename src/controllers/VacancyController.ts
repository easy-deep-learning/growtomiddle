import { auth } from '@/auth';

import VacancyModel from '@/database/models/Vacancy';
import mongooseConnect from '@/database/mongooseConnect';

export const getAll = async (params: { page: number; limit: number }) => {
  await mongooseConnect();

  const session = await auth();
  console.log('>>> session', session);

  return await VacancyModel.find()
    .sort({ createdAt: -1 })
    .skip((params.page - 1) * params.limit)
    .limit(params.limit)
    .lean();
};
