/**
 * Error thrown when there's a duplicate entity in the database
 */
export class DuplicateEntityError extends Error {
  constructor(entity: unknown) {
    super(`[DUPLICATE ENTITY ERROR] ${JSON.stringify(entity)} not found`)
    this.name = 'DuplicateEntityError'
  }
}