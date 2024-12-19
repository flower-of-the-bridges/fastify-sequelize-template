/**
 * Error thrown when there's an error during startup due to a wrong configuration
 */
export class ConfigurationError extends Error {
  constructor(message: string) {
    super(`[CONFIGURATION ERROR] ${message}`)
    this.name = 'ConfigurationError'
  }
}