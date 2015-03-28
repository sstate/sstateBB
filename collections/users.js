'use strict';
var user_role = require('./user_roles').Model;
var status = require('./status').Model;

var db = require('./../lib/db');

var User = db.Model.extend({
  tableName: 'bb_users',
  user_role: function(){
    return this.belongsTo(user_role, 'user_role');
  },
  status: function(){
    return this.belongsTo(status, 'status');
  }
});

var Users = db.Collection.extend({
  model: User
});

var users = new Users();

module.exports = {Collection: users, Model: User};