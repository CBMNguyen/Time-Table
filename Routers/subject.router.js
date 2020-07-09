var express = require('express');
var Router = express.Router();

var controller = require('../controllers/subject.controller');
var postValidate = require('../validates/subject.validate');
var createViewValidate = require('../validates/createView.validate');

Router.get('/create', controller.create);
Router.post('/create', postValidate,controller.postCreate);

Router.get('/:id', controller.view);

Router.get('/create/:id', controller.viewCreate);
Router.post('/create/:id', createViewValidate, controller.viewPostCreate);

Router.get('/remove/:id', controller.remove);

Router.get('/edit/:id', controller.edit);
Router.post('/edit/:id', controller.postEdit);

module.exports = Router;