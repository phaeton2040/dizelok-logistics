'use strict'

const User = use('App/Models/User');

class UserController {

    async index({ auth, request, response }) {
        response.send({ success: true })
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

    async create({ auth, request, response }) {
        throw new Error('Create user action not emplemented');
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

    async authInfo({ auth, request, response }) {
        try {
            await auth.check();
            response.send({ sucess: true, user: await auth.getUser()})
        } catch (error) {
            response.send({success: false})
        }
    }
}

module.exports = UserController
