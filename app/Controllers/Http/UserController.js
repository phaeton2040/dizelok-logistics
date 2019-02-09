'use strict'

const User = use('App/Models/User');

class UserController {
    async login({ auth, request, response }) {
        const { email, password } = request.all();

        try {
            response.send(await auth.attempt(email, password));
        } catch (e) {
            response.status(401);
            response.send(e);
        }
    }

    async create({ auth, request, response }) {
        throw new Error('Create user action not emplemented');
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
