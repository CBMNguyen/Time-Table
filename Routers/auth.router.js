var express = require('express');
var Router = express.Router();

var controller = require('../controllers/auth.controller');
var signupMiddleWare = require('../middlewares/signup.middleware');
var loginMiddleWare = require('../middlewares/login.middleware');

Router.get('/signup', controller.signup);
Router.post('/signup',signupMiddleWare, controller.postSignup);

Router.get('/login', controller.login);
Router.post('/login', controller.postLogin);

module.exports = Router;
