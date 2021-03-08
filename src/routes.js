const routes = require('express').Router();

const sessionController = require('./controllers/SessionController');
const userController = require('./controllers/UserController');
const isAuthenticated = require('./middlewares/isAuthenticated');

routes.post('/sessions', sessionController.store);

routes.get('/oauth', isAuthenticated, userController.oAuth);

module.exports = routes;