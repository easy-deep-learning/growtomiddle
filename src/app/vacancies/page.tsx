import { auth } from '@/auth';
import { getAll } from '@/controllers/Vacancy';

import { IVacancy } from '@/database/models/Vacancy';
import { VacancyList } from '@/components/Vacancy';

export default async function VacanciesPage(props: PageProps<'/vacancies'>) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? Number(searchParams?.page) : 1;
  const limit = searchParams?.limit ? Number(searchParams?.limit) : 10;

  const session = await auth();

  console.log('>>> session', session);

  const vacancies = await getAll({ page, limit });

  return <VacancyList vacancies={vacancies as unknown as IVacancy[]} />;
}
