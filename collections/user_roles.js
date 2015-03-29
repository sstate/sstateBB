'use strict';

var db = require('./../lib/db');
var User = require('./users').Model;

var Role = db.Model.extend({
  tableName: 'user_roles',
  hasTimestamps: true
});

var User_Roles = db.Collection.extend({
  model: Role
});

var user_roles = new User_Roles();

module.exports = {Collection: user_roles, Model: Role};