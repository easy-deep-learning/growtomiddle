import Link from 'next/link';

import type { VacancyDocument } from '@/database/models/Vacancy';

import { VacancyCard } from './VacancyCard';

interface VacancyListProps {
  vacancies: VacancyDocument[];
}

export const VacancyList: React.FC<VacancyListProps> = ({ vacancies }) => {
  return (
    <div>
      <h1>Vacancies</h1>
      <div>
        <Link href="/vacancies/new">Add a Vacancy</Link>
      </div>
      count: {vacancies.length}
      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      ))}
    </div>
  );
};
