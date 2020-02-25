process.on('uncaughtException', function(err) {
  console.error(err)
})

process.on('unhandledRejection', function(err) {
  console.error(err)
})

const chai = require('chai')

/*
NOTE: https://gist.github.com/pahund/3abcc5212431cef3dae455d5285b7bd7
*/

// Make sure chai and jasmine ".not" play nice together
const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get
Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    Object.assign(this, this.assignedNot)
    return originalNot.apply(this)
  },
  set(newNot) {
    this.assignedNot = newNot
    return newNot
  }
})

// Combine both jest and chai matchers on expect
const jestExpect = global.expect
global.chaiExpect = chai.expect

global.expect = actual => {
  const originalMatchers = jestExpect(actual)
  const chaiMatchers = chai.expect(actual)
  const combinedMatchers = Object.assign(chaiMatchers, originalMatchers)

  return combinedMatchers
}

Object.keys(jestExpect).forEach(
  key => (global.expect[key] = jestExpect[key])
)
