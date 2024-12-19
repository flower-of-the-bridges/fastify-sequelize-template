import { Application } from './infrastructure/application'

const app = new Application({
  database: true,
  documentation: true,
  logger: true,
})
app.start()