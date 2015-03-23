'use strict';

var db = require('./../lib/db');

var User = db.Model.extend({
  tableName: 'bb_users'
});

var Users = db.Collection.extend({
  model: User
});

var users = new Users();

module.exports = {Collection: users, Model: User};