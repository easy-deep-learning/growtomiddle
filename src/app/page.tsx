import { headers } from 'next/headers';
import Link from 'next/link';

import type { IVacancy } from '@/database/models/Vacancy';
import { AuthPanel } from '@/components/AuthPanel';
import { VacanciesDashboard } from '@/components/Vacancy';

async function getLatestVacancies(baseUrl: string): Promise<IVacancy[]> {
  try {
    const response = await fetch(`${baseUrl}/api/vacancies?limit=5`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as IVacancy[];
    return data;
  } catch (error) {
    console.error('Failed to fetch vacancies for dashboard', error);
    return [];
  }
}

export default async function HomePage() {
  const host = 'localhost:3000';
  const protocol = 'http';
  const origin = `${protocol}://${host}`.replace(/\/$/, '');

  const latestVacancies = await getLatestVacancies(origin);

  return (
    <div className="HomePage" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <AuthPanel />
      <menu>
        <ul>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/learn-english">learn-english</Link>
          </li>
          <li>
            <Link href="/vacancies">Vacancies</Link>
          </li>
        </ul>
      </menu>

      <VacanciesDashboard vacancies={latestVacancies} />
    </div>
  );
}
