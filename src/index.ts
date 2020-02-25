interface FlattenedRules {
  [key: string]: Array<Rule>
}

export interface Rule {
  a: string
  canBe?: string
  canDo?: string
  when?: (...args: any) => Promise<boolean>
}

interface Options {
  flattedRules?: FlattenedRules
  rules?: Array<Rule>
}

export default class RBAC {
  rules: Array<Rule>

  constructor(options: Options) {

    this.rules = options.rules || []

  }

  async check(role: Array<string> | string, action: string, options?: any) {

    let result = false

    const roles: FlattenedRules = this.flattenRules(this.rules)

    // Make sure a list of roles can be passed
    if(!(role instanceof Array)) {
      role = [role]
    }

    for(let i = 0, l = role.length; i < l; i++) {
      const item = role[i]

      if(roles[item]) {

        for(let j = 0, k = roles[item].length; j < k; j++) {
          const r = roles[item][j]

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

      // No need to check other roles
      if(result) {
        break
      }

    }

    return result

  }

  flattenRules(rules: Array<Rule>): FlattenedRules {

    const roles: FlattenedRules = {}

    for(let i = 0, l = rules.length; i < l; i++) {
      const rule = rules[i]

      if(!roles[rule.a]) {
        roles[rule.a] = this.getRoleRules(rule.a)
      }
    }

    return roles

  }

  getRoleRules(role: string): Array<Rule> {

    let rules: Array<Rule> = []

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
