'use strict';
var user = require('./users').Model;
var topic = require('./topics').Model;
var status = require('./status').Model;

var db = require('./../lib/db');

var Thread = db.Model.extend({
  tableName: 'threads',
  hasTimestamps: true,
  author_id: function(){
    return this.belongsTo(user, 'bb_users');
  },
  status: function(){
    return this.belongsTo(status, 'status');
  },
  topic: function(){
    return this.belongsTo(topic, 'topics');
  }
});

var Threads = db.Collection.extend({
  model: Thread
});

var threads = new Threads();

module.exports = {Collection: threads, Model: Thread};