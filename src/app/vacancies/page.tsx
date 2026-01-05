import { VacancyDocument } from '@/database/models/Vacancy';
import { VacancyList } from '@/components/Vacancy';
import { getAll } from '@/controllers/VacancyController';

export default async function VacanciesPage(props: PageProps<'/vacancies'>) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? Number(searchParams?.page) : 1;
  const limit = searchParams?.limit ? Number(searchParams?.limit) : 10;

  const vacancies = await getAll({ page, limit });

  console.log('>>> vacancies', vacancies);

  return <VacancyList vacancies={vacancies as unknown as VacancyDocument[]} />;
}
