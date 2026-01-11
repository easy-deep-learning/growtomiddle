'use client';

import { use } from 'react';

import type { VacancyDocument } from '@/database/models/Vacancy';

import { VacancyList } from './VacancyList';

export const VacanciesListContainer = ({
  vacanciesPromise,
}: {
  vacanciesPromise: Promise<VacancyDocument[]>;
}) => {
  const vacancies = use<VacancyDocument[]>(vacanciesPromise);
  return <VacancyList vacancies={vacancies} />;
};
