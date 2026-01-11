import { Suspense } from 'react';
import { Spin } from 'antd';

import { VacancyDocument } from '@/database/models/Vacancy';
import { VacanciesListContainer } from '@/components/Vacancy/VacanciesListContainer';
import { getAll } from '@/controllers/VacancyController';

export default async function VacanciesPage(props: PageProps<'/vacancies'>) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? Number(searchParams?.page) : 1;
  const limit = searchParams?.limit ? Number(searchParams?.limit) : 10;

  const vacanciesPromise = getAll({ page, limit });

  const loader = (
    <div style={{ textAlign: 'center', padding: 32 }}>
      <Spin size="large" />
    </div>
  );

  return (
    <div>
      <Suspense fallback={loader}>
        <VacanciesListContainer
          vacanciesPromise={vacanciesPromise as unknown as Promise<VacancyDocument[]>}
        />
      </Suspense>
    </div>
  );
}
