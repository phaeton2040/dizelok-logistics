'use strict'

/** @type {typeof import('../../Models/Customer')} */
const Customer = use('App/Models/Customer');

/** @type {typeof import('../../Models/Customer')} */
const DeliveryPoint = use('App/Models/DeliveryPoint');

class CustomerController {
    async getCustomers({ auth, request, response }) {
        try {
            const currentUser = await auth.getUser();
            const { page } = request.get();
            const customerSeries = await Customer.query()
                                         .where('organisationId', '=', currentUser.organisationId).paginate(page, 10);

            response.send({ ...customerSeries.toJSON() });
        } catch (e) {
            response.status(400);
            response.send({ ok: false, error: e.message })
        }
    }

    async createCustomer({ auth, request, response }) {
        try {
            const currentUser = await auth.getUser();
            const { name, contacts, deliveryPoints } = request.all();
            const customer = new Customer();

            customer.fill({
                name,
                contacts: JSON.stringify(contacts),
                organisationId: currentUser.organisationId
            });

            await customer.save();

            deliveryPoints.forEach(async (point) => {
                try {
                    if (!point.id) {
                        const dbPoint = new DeliveryPoint();
    
                        dbPoint.fill({ ...point, customerId: customer.id });
                        await dbPoint.save();
                    } else {
                        const dbPoint = await DeliveryPoint.find(point.id);
    
                        dbPoint.merge(point);
                        await dbPoint.save();
                    }
                } catch(e) {
                    response.status(400);
                    return response.send({ ok: false, error: e.message })
                }
            });

            response.send({ ok: true, customer: { ...customer.$attributes } });
        } catch (e) {
            response.status(400);
            response.send({ ok: false, error: e.message })
        }
    }

    async updateCustomer({ request, response }) {
        try {
            const { id, name, contacts, deliveryPoints } = request.all();
            const customer = await Customer.findOrFail(id);

            customer.merge({
                name,
                contacts: JSON.stringify(contacts)
            });

            deliveryPoints.forEach(async (point) => {
                try {
                    if (!point.id) {
                        const dbPoint = new DeliveryPoint();
    
                        dbPoint.fill({ ...point, customerId: customer.id });
                        await dbPoint.save();
                    } else {
                        const dbPoint = await DeliveryPoint.find(point.id);
    
                        dbPoint.merge(point);
                        await dbPoint.save();
                    }
                } catch(e) {
                    response.status(400);
                    return response.send({ ok: false, error: e.message })
                }
            });
            await customer.save();
            response.send({ ok: true, customer: { ...customer.$attributes } });
        } catch (e) {
            response.status(400);
            response.send({ ok: false, error: e.message })
        }
    }

    async getCustomer({ response, params }) {
        try {
            const { id } = params;
            const customer = await Customer.findOrFail(id);

            // TODO: check if we can eagerly load delivery points
            const deliveryPoints = await customer.deliveryPoints().fetch();

            response.send({ ok: true, customer: { ...customer.$attributes, deliveryPoints} })
        } catch (error) {
            response.status(404);
            response.send({ ok: false, error: error.message })
        }
    }

    async deleteCustomer({ response, params }) {
        try {
            const { id } = params;
            const customer = await Customer.findOrFail(id);

            await customer.delete()
            
            response.send({ ok: true })
        } catch (error) {
            response.status(404);
            response.send({ ok: false, error: 'User with specified ID not found' })
        }
    }

    async deleteDeliveryPoint({ response, params }) {
        try {
            const { id } = params;
            const point = await DeliveryPoint.findOrFail(id);

            await point.delete()
            
            response.send({ ok: true })
        } catch(e) {
            response.status(400);
            response.send({
                ok: false,
                message: e.message
            })
        }
    }
}

module.exports = CustomerController
