import './set-env';

import { seedVacancies } from '../mocks-data/mockData/Vacancy';
import { parseArgs, showHelp } from './common';

async function main() {
  const { count, help } = parseArgs();

  if (help) {
    showHelp();
    process.exit(0);
  }

  if (count <= 0) {
    console.error('Error: Count must be a positive number');
    process.exit(1);
  }

  try {
    console.log(`🌱 Seeding ${count} vacancies...`);
    const result = await seedVacancies(count);
    console.log(`✅ Successfully seeded ${result.length} vacancies!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding vacancies:', error);
    process.exit(1);
  }
}

main();
