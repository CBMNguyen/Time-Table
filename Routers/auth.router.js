var express = require('express');
var Router = express.Router();

var controller = require('../controllers/auth.controller');
var signupValidate = require('../validates/signup.validate');
var loginValidate = require('../validates/login.validate');
var loginMiddleWare = require('../middlewares/login.middleware');

Router.get('/signup', controller.signup);
Router.post('/signup',signupValidate, controller.postSignup);

Router.get('/login', controller.login);
Router.get('/logout', controller.logout);
Router.post('/login',loginValidate, controller.postLogin);

module.exports = Router;
