import { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { Config } from '../application/schemas'
import { APITag } from '../../interfaces'

/**
 * Adds OpenAPI 3.0.0 specifications to the application and exposes
 * a Swagger UI over the `/documentation` path.
 * @param fastify 
 */
export const documentation = async (fastify: FastifyInstance) => {
  const { HTTP_PORT } = fastify.getEnvs<Config>()
  await fastify.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Biz Away Tech Challenge',
        description: 'Testing the Biz Away Tech Challenge API',
        version: '0.1.0',
      },
      servers: [
        {
          url: `http://localhost:${HTTP_PORT}`,
          description: 'Development server',
        }
      ],
      tags: [] as {name: APITag, description: string}[],
      externalDocs: {
        url: 'https://bitbucket.org/bizaway/tech-challenge/src/main/backend.md',
        description: 'Find more info here',
      },
    },
    refResolver: {
      buildLocalReference(json, _baseUri, _fragment, i) {
        return json.$id?.toString() || `my-fragment-${i}`
      },
    },
  })

  await fastify.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => { return swaggerObject },
    transformSpecificationClone: true,
  })
} 