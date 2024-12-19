import { Sequelize } from 'sequelize'

/**
 * Get a new database connection
 * @param storage location where to store the SQL Lite database
 * @returns db instance
 */
export const getDatabase = async (storage: string) => {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage,
    logging: false,
  })

  await sequelize.authenticate()
  return sequelize
}