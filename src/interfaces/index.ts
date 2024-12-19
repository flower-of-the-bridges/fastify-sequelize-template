import { FastifyInstance } from 'fastify'

/**
 * Generic interface to create a repository that manages records. Three generics are needed:
 * - `M`: represents the model that is managed by the repository;
 * - `I`: represents the identifier of an entity within the repository
 */
export interface Repository<M, I> {
    /**
     * Define the data model in the repository
     */
    init() : Promise<void>

    /**
     * Returns a list of `M` records
     */
    list() : Promise<M[]>

    /**
     * Creates a new record in the repository
     * @param entity data that needs to be stored in the model
     * @returns {Promise<I>} identifier of the record 
     */
    create(entity: M) : Promise<I>

    /**
     * Deletes an existing record in the repository
     * @param identifier
     */
    delete(identifier: I) : Promise<void>
} 

/**
 * Defines possible tags that can be used to document an API.
 */
export type APITag = string

/**
 * Defines a plugin that can be registered to an applicationj
 */
export type AppPlugin = {
    plugin: (fastify: FastifyInstance) => Promise<void>
    // optional prefix used as base path to register plugin routes
    prefix?: string
}