var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

var db = low(adapter);
db.defaults({ users: [], subject: [], timetable: [], personal: [], hacknao: [] })
  .write();
module.exports = db;