import { faker } from '@faker-js/faker';

import type { IHrQuestion } from '@/database/models/HrQuestion';

/**
 * Generate a single mock HrQuestions object
 */
export function generateMockHrQuestion() {
  return {
    // TODO: Customize these fields based on your model
    name: faker.person.fullName(),
  };
}

/**
 * Generate multiple mock HrQuestions objects
 */
export function generateMockHrQuestions(count: number = 10) {
  return Array.from({ length: count }, () => generateMockHrQuestion());
}

/**
 * Generate mock HrQuestions data for seeding the database
 */
export async function seedHrQuestions(count: number = 10) {
  const HrQuestions = generateMockHrQuestions(count);

  // TODO: Import your model and mongooseConnect
  // import HrQuestionsModel from '@/database/models/HrQuestions';
  // import mongooseConnect from '@/database/mongooseConnect';
  //
  // await mongooseConnect();
  // await HrQuestionsModel.insertMany(HrQuestions);

  console.log(`Generated ${count} mock HrQuestions`);
  return Promise.resolve();
}
