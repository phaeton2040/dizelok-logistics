'use strict'

const User = use('App/Models/Organisation');

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
}

module.exports = OrganisationController
