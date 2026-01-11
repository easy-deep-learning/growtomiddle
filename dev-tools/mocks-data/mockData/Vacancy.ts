import { faker } from '@faker-js/faker';

import VacancyModel from '@/database/models/Vacancy';
import mongooseConnect from '@/database/mongooseConnect';

/**
 * Generate a single mock vacancy object
 */
export function generateMockVacancy() {
  return {
    title: faker.person.jobTitle(),
    sourceUrl: faker.internet.url(),
    location: faker.location.city(),
    techStack: faker.helpers.arrayElements(
      ['React', 'TypeScript', 'Node.js', 'Next.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
      { min: 2, max: 5 }
    ),
    salary: faker.number.int({ min: 30000, max: 200000 }),
    descriptionSnippet: faker.lorem.paragraph(),
  };
}

/**
 * Generate multiple mock vacancy objects
 */
export function generateMockVacancies(count: number = 10) {
  return Array.from({ length: count }, () => generateMockVacancy());
}

/**
 * Generate mock vacancy data for seeding the database
 * This function returns data ready to be inserted into MongoDB
 */
export async function seedVacancies(count: number = 10) {
  const vacancies = generateMockVacancies(count);
  await mongooseConnect();
  const result = await VacancyModel.insertMany(vacancies);
  return result;
}
