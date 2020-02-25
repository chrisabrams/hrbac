const NodeEnvironment = require('jest-environment-node')

class CustomEnvironment extends NodeEnvironment {

  async setup() {
    await super.setup()
  }

  async teardown() {
    await super.teardown()
  }
}

module.exports = CustomEnvironment
