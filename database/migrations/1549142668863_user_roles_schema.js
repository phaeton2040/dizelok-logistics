'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRolesSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('role', 20).notNullable();
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('role')
    })
  }
}

module.exports = UserRolesSchema
