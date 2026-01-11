import Link from 'next/link';

import { VacancyDocument } from '@/database/models/Vacancy';
import { VacancyCard } from '@/components/Vacancy/VacancyCard';
import { VacancyDeleteButton } from '@/components/Vacancy/VacancyDeleteButton';
import { getById } from '@/controllers/VacancyController';

export default async function VacancyPage(props: PageProps<'/vacancies/[id]'>) {
  const { id } = await props.params;

  const vacancy = await getById(id);

  if (!vacancy) {
    return <div>Vacancy not found</div>;
  }

  return (
    <div>
      <Link href={`/vacancies/${id}/edit`}>Edit</Link>
      <VacancyDeleteButton vacancyId={id} />
      <VacancyCard vacancy={vacancy as unknown as VacancyDocument} rows={10} expandable={true} />
    </div>
  );
}
