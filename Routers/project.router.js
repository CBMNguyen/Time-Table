var express = require('express');
var Router = express.Router();

var controller = require('../controllers/project.controller');

Router.get('/', controller.index);

module.exports = Router;