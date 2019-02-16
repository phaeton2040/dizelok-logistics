'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserNameSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('firstName', 100);
      table.string('lastName', 100);
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('firstName');
      table.dropColumn('lastName');
    })
  }
}

module.exports = UserNameSchema
