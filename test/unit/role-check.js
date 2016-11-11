import RBAC from '../../src/index'

describe('Role Check', function() {

  it('should check a direct role with action', async function() {

    const rbac = new RBAC({
      rules: [
        {a: 'user', canDo: 'say hello'}
      ]
    })

    const res = await rbac.check('user', 'say hello')

    expect(res).to.be.true

  })

  it('should fail check a direct role with action', async function() {

    const rbac = new RBAC({
      rules: [
        {a: 'user', canDo: 'say hello'}
      ]
    })

    const res = await rbac.check('user', 'say goodbye')

    expect(res).to.be.false

  })

  it('should check an inherited role with action', async function() {

    const rbac = new RBAC({
      rules: [
        {a: 'user', canDo: 'say hello'},
        {a: 'admin', canBe: 'user'}
      ]
    })

    const res = await rbac.check('admin', 'say hello')

    expect(res).to.be.true

  })

  it('should fail check an inherited role with action', async function() {

    const rbac = new RBAC({
      rules: [
        {a: 'user', canDo: 'say hello'},
        {a: 'admin', canBe: 'user'}
      ]
    })

    const res = await rbac.check('admin', 'say goodbye')

    expect(res).to.be.false

  })

  it('should check an multi-inherited role with action', async function() {

    const rbac = new RBAC({
      rules: [
        {a: 'user', canDo: 'say hello'},
        {a: 'editor', canBe: 'user'},
        {a: 'admin', canBe: 'editor'}
      ]
    })

    const res = await rbac.check('admin', 'say hello')

    expect(res).to.be.true

  })

  it('should check a role with conditional action', async function() {

    const rbac = new RBAC({
      rules: [
        {a: 'user', canDo: 'say hello', when: function sayHelloWhen() {
          return Promise.resolve(true)
        }}
      ]
    })

    const res = await rbac.check('user', 'say hello')

    expect(res).to.be.true

  })

  it('should fail check a role with conditional action', async function() {

    const rbac = new RBAC({
      rules: [
        {a: 'user', canDo: 'say hello', when: await function sayHelloWhen() {
          return Promise.resolve(false)
        }}
      ]
    })

    const res = await rbac.check('user', 'say hello')

    expect(res).to.be.false

  })

  it('should check a role with conditional action and parameters', async function() {

    const rbac = new RBAC({
      rules: [
        {a: 'user', canDo: 'say hello', when: function sayHelloWhen(params = {}) {
          return params.world
        }}
      ]
    })

    const res = await rbac.check('user', 'say hello', {world: true})

    expect(res).to.be.true

  })

  it('should fail check a role with conditional action and parameters', async function() {

    const rbac = new RBAC({
      rules: [
        {a: 'user', canDo: 'say hello', when: function sayHelloWhen(params = {}) {
          return params.world
        }}
      ]
    })

    const res = await rbac.check('user', 'say hello', {world: false})

    expect(res).to.be.false

  })

})
