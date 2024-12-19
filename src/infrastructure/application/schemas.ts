import { FromSchema } from 'json-schema-to-ts'
import type { JSONSchema } from 'json-schema-to-ts'

export const configSchema = {
  type: 'object',
  properties: {
    HTTP_PORT: {
      type: 'number',
      default: 3000,
    },
    DB_PATH: {
      type: 'string',
      default: ':memory:',
      description: 'Path to store the sqlite database.',
    },
  },
  additionalProperties: false,
} as const satisfies JSONSchema

export type Config = FromSchema<typeof configSchema>