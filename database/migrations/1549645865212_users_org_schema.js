'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersOrgSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.integer('organisation_id').references('organisations.id');
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('organisation_id');
    })
  }
}

module.exports = UsersOrgSchema
