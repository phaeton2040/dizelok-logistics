'use strict'

const Organisation = use('App/Models/Organisation');
const LoadingPoint = use('App/Models/LoadingPoint');

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
            });
        }
    }

    async getLoadingPoints({ auth, response }) {
        try {
            const currentUser = await auth.getUser();
            const organisation = await currentUser.organisation().fetch(); 
            response.send({
                ok: true,
                loadingPoints: await organisation.loadingPoints().fetch()
            })
        } catch(e) {
            response.status(400);
            response.send({
                ok: false,
                error: e.message
            });
        }
    }

    async saveLoadingPoint({ auth, request, response }) {
        try {
            const currentUser = await auth.getUser();
            const { name, address } = request.all();
            const loadingPoint = new LoadingPoint();

            loadingPoint.fill({ name, address });
            loadingPoint.organisationId = currentUser.organisationId;

            await loadingPoint.save();

            response.send({
                ok: true,
                loadingPoint: loadingPoint.$attributes
            })
        } catch(e) {
            response.status(400);
            response.send({
                ok: false,
                error: e.message
            });
        }
    }

    async deleteLoadingPoint({ response, params }) {
        try {
            const { id } = params;
            const loadingPoint = await LoadingPoint.findOrFail(id);

            await loadingPoint.delete();

            response.send({
                ok: true
            })
        } catch(e) {
            response.status(400);
            response.send({
                ok: false,
                error: e.message
            });
        }
    }
}

module.exports = OrganisationController
