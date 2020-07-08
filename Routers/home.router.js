var express = require('express');
var Router = express.Router();

var controller = require('../controllers/home.controller');

Router.get('/',controller.home);

module.exports = Router;
