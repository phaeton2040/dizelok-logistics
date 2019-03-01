'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
    user() {
        return this.belongsTo('App/Models/User', 'userId', 'id')
    }

    deliveryPoints() {
        return this.hasMany('App/Models/DeliveryPoint', 'id', 'organisationId');
    }
}

module.exports = Customer
