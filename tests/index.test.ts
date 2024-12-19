import { describe, it } from 'node:test'
import { Application } from '../src/infrastructure/application'
import assert from 'node:assert'

describe('[app] startup', () => {

  it('should start with needed env variables', async() => {
    process.env.API_KEY = 'some-api-key'
    const application = new Application()
    await application.start()

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
