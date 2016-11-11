class RBAC {

  constructor(options = {}) {

    this.rules = options.rules || []

  }

  check(role, action, options = {}) {

    let result = false

    return new Promise( async (resolve, reject) => {

      const roles = this.flattenRules(this.rules)

      if(roles[role]) {

        for(let i = 0, l = roles[role].length; i < l; i++) {
          const r = roles[role][i]

          if(r.canDo == action) {

            if(r.when) {
              result = await r.when(options)
            }

            else {
              result = true
            }

          }
        }

      }

      resolve(result)

    })

  }

  flattenRules(rules = []) {

    const roles = {}

    for(let i = 0, l = rules.length; i < l; i++) {
      const rule = rules[i]

      if(!roles[rule.a]) {
        roles[rule.a] = this.getRoleRules(rule.a)
      }
    }

    return roles

  }

  getRoleRules(role) {

    let rules = []

    for(let i = 0, l = this.rules.length; i < l; i++) {
      const rule = this.rules[i]

      if(rule.a == role && rule.canDo) {
        rules.push(rule)
      }

      if(rule.a == role && rule.canBe) {
        const result = this.getRoleRules(rule.canBe)
        rules = rules.concat(result)
      }
    }

    return rules

  }

}

export default RBAC
