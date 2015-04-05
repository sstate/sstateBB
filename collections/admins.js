'use strict';

var db = require('./../lib/db');

var Admin = db.Model.extend({
  tableName: 'bb_admins',
  hasTimestamps: true
});

var Admins = db.Collection.extend({
  model: Admin
});

var admins = new Admins();

module.exports = {Collection: admins, Model: Admin};