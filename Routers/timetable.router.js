var express = require('express');
var db = require('../db');
var Router = express.Router();
var controller = require('../controllers/timetable.controller');

var subjects = db.get('timetable').value();

Router.get('/', controller.timetable);
Router.get('/search', controller.search);

module.exports = Router;