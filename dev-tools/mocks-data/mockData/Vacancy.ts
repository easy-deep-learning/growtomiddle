import { faker } from '@faker-js/faker';

import VacancyModel from '@/database/models/Vacancy';
import mongooseConnect from '@/database/mongooseConnect';

/**
 * Generate a single mock vacancy object
 */
export function generateMockVacancy() {
  return {
    companyId: faker.string.uuid(),
    title: faker.person.jobTitle(),
    size: faker.helpers.arrayElement(['small', 'medium', 'large']),
    type: faker.helpers.arrayElement([
      'startup',
      'enterprise',
      'government',
      'non-profit',
      'other',
    ]),
    source: faker.helpers.arrayElement(['linkedin', 'xing', 'indeed', 'referral', 'other']),
    sourceUrl: faker.internet.url(),
    location: faker.location.city(),
    employmentType: faker.helpers.arrayElement([
      'full-time',
      'part-time',
      'contract',
      'internship',
    ]),
    level: faker.helpers.arrayElement(['junior', 'middle', 'senior', 'lead']),
    techStack: faker.helpers.arrayElements(
      ['React', 'TypeScript', 'Node.js', 'Next.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
      { min: 2, max: 5 }
    ),
    salaryRange: {
      from: faker.number.int({ min: 30000, max: 100000 }),
      to: faker.number.int({ min: 100000, max: 200000 }),
      currency: 'EUR',
      gross: true,
    },
    descriptionSnippet: faker.lorem.paragraph(),
    notes: faker.lorem.sentence(),
    isSaved: faker.datatype.boolean(),
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
