import './set-env';

import { seedRoles } from '../mocks-data/mockData/Role';
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
    console.log(`🌱 Seeding ${count} roles...`);
    const result = await seedRoles(count);
    console.log(`✅ Successfully seeded ${result} roles!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding roles:', error);
    process.exit(1);
  }
}

main();
