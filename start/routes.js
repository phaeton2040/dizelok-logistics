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

// User routes
Route.get('/', 'UserController.index')
Route.post('/login', 'UserController.login')
Route.delete('/logout', 'UserController.logout').middleware('auth')
Route.post('/refresh-token', 'UserController.refreshToken').middleware('auth')
Route.get('/users/:id', 'UserController.getUser').middleware('auth')
Route.post('/users/:id', 'UserController.updateUser').middleware('auth')
Route.delete('/users/:id', 'UserController.deleteUser').middleware('auth')
Route.get('/users', 'UserController.getUsers').middleware('auth')
Route.post('/users', 'UserController.createUser').middleware('auth')

// Organisation routes
Route.get('/organisation/current', 'OrganisationController.getOrganisationData').middleware('auth')
Route.get('/organisation/loading-points', 'OrganisationController.getLoadingPoints').middleware('auth')
Route.post('/organisation/loading-points', 'OrganisationController.saveLoadingPoint').middleware('auth')
Route.delete('/organisation/loading-points/:id', 'OrganisationController.deleteLoadingPoint').middleware('auth')
Route.post('/organisation', 'OrganisationController.updateOrganisationData').middleware('auth')


// Customer routes
Route.get('/customers/:id', 'CustomerController.getCustomer').middleware('auth')
Route.post('/customers/:id', 'CustomerController.updateCustomer').middleware('auth')
Route.delete('/customers/:id', 'CustomerController.deleteCustomer').middleware('auth')
Route.get('/customers', 'CustomerController.getCustomers').middleware('auth')
Route.post('/customers', 'CustomerController.createCustomer').middleware('auth')
Route.delete('/customers/delivery-point/:id', 'CustomerController.deleteDeliveryPoint').middleware('auth')