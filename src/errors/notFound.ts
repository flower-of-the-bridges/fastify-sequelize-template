/**
 * Error thrown when an entity wasn't found.
 */
export class NotFoundError extends Error {
  constructor(resourceId: string) {
    super(`[NOT FOUND ERROR] ${resourceId} not found`)
    this.name = 'NotFoundError'
  }
}