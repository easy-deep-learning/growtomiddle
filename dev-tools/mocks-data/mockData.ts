import { faker } from '@faker-js/faker';

/**
 * Generate a random value from an array of options
 */
export function randomFromArray<T>(array: T[]): T {
  return faker.helpers.arrayElement(array);
}

/**
 * Generate a random number between min and max (inclusive)
 */
export function randomNumber(min: number, max: number): number {
  return faker.number.int({ min, max });
}

/**
 * Generate a random boolean
 */
export function randomBoolean(): boolean {
  return faker.datatype.boolean();
}

/**
 * Generate a random date between now and the past N days
 */
export function randomDate(daysAgo: number = 30): Date {
  return faker.date.recent({ days: daysAgo });
}

/**
 * Generate a random string of specified length
 */
export function randomString(length: number = 10): string {
  return faker.string.alphanumeric(length);
}

/**
 * Generate a random email
 */
export function randomEmail(): string {
  return faker.internet.email();
}

/**
 * Generate a random URL
 */
export function randomUrl(): string {
  return faker.internet.url();
}

/**
 * Generate a random sentence
 */
export function randomSentence(wordCount: number = 10): string {
  return faker.lorem.sentence(wordCount);
}

/**
 * Generate a random paragraph
 */
export function randomParagraph(sentenceCount: number = 3): string {
  return faker.lorem.paragraph(sentenceCount);
}

/**
 * Generate multiple random items
 */
export function randomItems<T>(
  generator: () => T,
  count: number = 5
): T[] {
  return Array.from({ length: count }, generator);
}

