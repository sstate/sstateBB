var db = require('./../lib/db');

var Status = db.Model.extend({
  tableName: 'status'
});

var Statuses = db.Collection.extend({
  model: Status
});

var user_roles = new Statuses();

module.exports = {Collection: user_roles, Model: Status};