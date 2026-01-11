import type { VacancyDocument } from '@/database/models/Vacancy';
import { VacancyForm } from '@/components/Vacancy';
import { getById } from '@/controllers/VacancyController';

export default async function VacanciesEditPage(props: PageProps<'/vacancies/[id]/edit'>) {
  const { id } = await props.params;

  const vacancy = await getById(id);

  if (!vacancy) {
    return <div>Vacancy not found</div>;
  }

  console.log('>>> VacanciesEditPage vacancy', vacancy);

  return <VacancyForm vacancy={vacancy as unknown as VacancyDocument} />;
}
