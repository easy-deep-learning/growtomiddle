import { faker } from '@faker-js/faker';

import { Action, Resource } from '@/database/datatypes/Permission';
import type { Role } from '@/database/datatypes/Role';
import RoleModel from '@/database/models/Role';
import mongooseConnect from '@/database/mongooseConnect';

/**
 * Generate a single mock Role object
 */
export function generateMockRole(): Omit<Role, '_id' | 'createdAt' | 'updatedAt'> {
  return {
    name: faker.helpers.arrayElement([
      'Manager',
      'Operator',
      'Supervisor',
      'Administrator',
      'Analyst',
      'Coordinator',
      'Director',
      'Specialist',
      'Consultant',
      'Assistant',
      'Executive',
    ]),
    permissions: [
      {
        actions: faker.helpers.arrayElements(Object.values(Action), {
          min: 1,
          max: Object.values(Action).length,
        }),
        resource: faker.helpers.arrayElement(Object.values(Resource)),
      },
    ],
  };
}

/**
 * Generate mock Role data for seeding the database
 * This function returns data ready to be inserted into MongoDB
 */
export async function seedRoles(count: number = 10) {
  const roles = Array.from({ length: count }, () => generateMockRole());

  await mongooseConnect();

  const result = await RoleModel.insertMany(roles);

  console.log('>>> seedRoles result', result);

  console.log(`Generated ${count} mock Roles`);
  return result;
}
