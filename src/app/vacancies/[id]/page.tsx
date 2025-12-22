import { format } from 'date-fns';

import VacancyModel from '@/database/models/Vacancy';

export default async function VacancyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vacancy = await VacancyModel.findById(id).lean();

  return (
    <div className="VacancyPage">
      <h1>{vacancy?.title}</h1>
      <p>{vacancy?.descriptionSnippet}</p>
      <p>{vacancy?.location}</p>
      <p>
        {vacancy?.salaryRange?.from} - {vacancy?.salaryRange?.to}
      </p>
      <p>{vacancy?.createdAt && format(vacancy?.createdAt, 'dd.MM.yyyy')}</p>
      <p>{vacancy?.updatedAt && format(vacancy?.updatedAt, 'dd.MM.yyyy')}</p>
    </div>
  );
}
