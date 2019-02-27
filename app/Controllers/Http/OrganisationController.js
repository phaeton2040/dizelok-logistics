'use strict'

const Organisation = use('App/Models/Organisation');

class OrganisationController {
    async getOrganisationData({ auth, response }) {
        try {
            const currentUser = await auth.getUser();

            response.send({
                ok: true,
                organisation: await currentUser.organisation().fetch()
            });
        } catch (e) {
            response.status(400);
            response.send({
                ok: false,
                error: e.message
            });
        }
    }

    async updateOrganisationData({ auth, request, response }) {
        try {
            const attrs = request.all();
            const org = await Organisation.findOrFail(attrs.id);

            delete attrs.id;

            org.merge(attrs);

            await org.save();

            response.send({
                ok: true,
                organisation: org.$attributes
            })
        } catch(e) {
            response.status(404);
            response.send({
                ok: false,
                error: e.message
            })
        }
    }
}

module.exports = OrganisationController
