'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DeliveryPoint extends Model {
    customer() {
        return this.belongsTo('App/Models/Customer', 'customerId', 'id');
    }
}

module.exports = DeliveryPoint
