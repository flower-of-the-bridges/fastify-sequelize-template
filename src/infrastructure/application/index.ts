import fastify, { FastifyInstance } from 'fastify'
import { Config, configSchema } from './schemas'
import fastifyEnv from '@fastify/env'
import { documentation } from '../documentation'
import { getDatabase } from '../database'
import { Sequelize } from 'sequelize'
import { AppPlugin } from '../../interfaces'

declare module 'fastify' {
    interface FastifyInstance {
      config: Config
      db?: Sequelize
    }
}

/**
 * Settings that can be enabled in the application 
 */
type AppOptions = {
  /**
   * enable logging message 
   */
  logger?: boolean,
  /**
   * enable openapi documentation and swagger-ui
   */
  documentation?: boolean
  /**
   * enable sqlite database
   */
  database?: boolean
}
export class Application {
  private app: FastifyInstance
  private showDocumentation: boolean | undefined
  private useDatabase: boolean | undefined

  constructor(options?: AppOptions) {
    this.app = fastify({
      logger: options?.logger,
    })
    this.showDocumentation = options?.documentation
    this.useDatabase = options?.database
  }

  /**
   * Start the fastify server with a set of plugin
   * @param plugins list of plugins
   */
  async start(...plugins: AppPlugin[]) {
    await this.app.register(fastifyEnv, {
      schema: configSchema,
    })
    
    if(this.showDocumentation) {
      await documentation(this.app)
    }

    const { HTTP_PORT, DB_PATH } = this.app.config
    
    if(this.useDatabase) {
      this.app.decorate('db', await getDatabase(DB_PATH))
    }
    
    
    try {
      this.app.listen({
        port: HTTP_PORT,
        host: '0.0.0.0',
      })
          
      for (const { plugin, prefix } of plugins) {
        this.app.register(plugin, { prefix })
      }
              
      await this.app.ready()
      this.app.swagger?.()
    } catch(err) {
      this.app.log.error(err, 'Received error while running application.')
      await this.stop()
    }
    
  }

  private async stop() {
    return this.app.close()
  }
}
