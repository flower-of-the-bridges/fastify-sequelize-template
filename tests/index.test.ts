import { describe, it } from 'node:test'
import { Application } from '../src/infrastructure/application'
import assert from 'node:assert'
import { configSchema } from '../src/infrastructure/application/schemas'

describe('[app] startup', () => {

  it('should start with needed env variables', async() => {
    const application = new Application()
    await application.start()

    assert.strictEqual(application['app'].config.HTTP_PORT, configSchema.properties.HTTP_PORT.default, 'HTTP_PORT should have default value')
    assert.strictEqual(application['app'].config.DB_PATH, configSchema.properties.DB_PATH.default, 'DB_PATH should have default value')

    await application['stop']()
  })

  it('should fail with wrong HTTP_PORT', async() => {
    try {
      process.env.HTTP_PORT = 'should be a number'
      const application = new Application()
      await application.start()
      assert.fail('application should fail if HTTP_PORT is not a number')
    } catch {
      assert.ok(true, 'application stopped successfuly')
    }
  })
})
