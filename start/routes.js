'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'UserController.index')
Route.post('/login', 'UserController.login').middleware('guest')
Route.delete('/logout', 'UserController.logout').middleware('auth')
Route.post('/refresh-token', 'UserController.refreshToken').middleware('auth')
Route.post('/auth-info', 'UserController.authInfo').middleware('auth')
