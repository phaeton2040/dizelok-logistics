'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LoadingPoint extends Model {

    organisation() {
        return this.belongsTo('App/Models/Organisation');
    }

}

module.exports = LoadingPoint
