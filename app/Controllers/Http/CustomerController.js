'use strict'

/** @type {typeof import('../../Models/Customer')} */
const Customer = use('App/Models/Customer');

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

    async createCustomer({ request, response }) {
        try {
            const attrs = request.all();
            const customer = new Customer();

            customer.fill(attrs);

            await customer.save();
            response.send({ ok: true, customer: { ...customer.$attributes } });
        } catch (e) {
            response.status(400);
            response.send({ ok: false, error: e.message })
        }
    }

    async updateCustomer({ request, response }) {
        try {
            const attrs = request.all();
            const customer = await Customer.findOrFail(attrs.id);

            delete attrs.id;

            customer.merge(attrs);

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

            response.send({ ok: true, customer: await Customer.findOrFail(id)})
        } catch (error) {
            response.status(404);
            response.send({ ok: false, error: 'Customer with specified ID not found' })
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
}

module.exports = CustomerController
