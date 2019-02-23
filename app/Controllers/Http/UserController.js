'use strict'

const User = use('App/Models/User');

class UserController {

    async index({ auth, request, response }) {
        response.send({ success: true })
    }

    async createUser({ request, response }) {
        try {
            const { username, email, password, firstName, lastName, role, organisation_id } = request.all();
            const user = new User();

            user.fill({ username, email, password, firstName, lastName, role, organisation_id });

            await user.save();
            response.send({ ok: true, user: { ...user.$attributes } });
        } catch (e) {
            response.status(400);
            response.send({ ok: false, error: e.message })
        }
    }

    async updateUser({ request, response }) {
        try {
            const attrs = request.all();
            const user = await User.findOrFail(attrs.id);

            if (!attrs.password) {
                delete attrs.password;
            }

            delete attrs.id;

            user.merge(attrs);

            console.log(user.$attributes, attrs);
            await user.save();
            response.send({ ok: true, user: { ...user.$attributes } });
        } catch (e) {
            response.status(400);
            response.send({ ok: false, error: e.message })
        }
    }

    async getUsers({ auth, request, response }) {
        try {
            const currentUser = await auth.getUser();
            const { page } = request.get();
            const userSeries = await User.query()
                                         .where('organisation_id', '=', currentUser.organisation_id).paginate(page, 10);

            response.send({ ...userSeries.toJSON() });
        } catch (e) {
            response.status(400);
            response.send({ ok: false, error: e.message })
        }
    }

    async login({ auth, request, response }) {
        const { email, password } = request.all();

        try {
            response.send(
                await auth.withRefreshToken().attempt(email, password, true)
            );
        } catch (e) {
            response.status(401);
            response.send(e);
        }
    }

    async logout( { auth, request, response }) {
        const apiToken = auth.getAuthHeader()

        try {
            await auth
                .authenticator('api')
                .revokeTokens([apiToken]);
            response.send({ok: true});
        } catch (e) {
            response.status(500);
            response.send({ ok: false, error: e.message});
        }
    }

    async refreshToken({ auth, request, response }) {
        try {
            response.send(await auth.generate(await auth.getUser()), true);
        } catch (e) {
            response.status(500);
            response.send({ok: false, error: e.message});
        }
    }

    async getUser({ response, params }) {
        try {
            const { id } = params;

            response.send({ ok: true, user: await User.findOrFail(id)})
        } catch (error) {
            response.status(404);
            response.send({ ok: false, error: 'User with specified ID not found' })
        }
    }
}

module.exports = UserController
