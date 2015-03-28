'use strict';
var user = require('./users').Model;
var thread = require('./thread').Model;
var status = require('./status').Model;

var db = require('./../lib/db');

var Thread = db.Model.extend({
  tableName: 'posts',
  author_id: function(){
    return this.belongsTo(user, 'bb_users');
  },
  status: function(){
    return this.belongsTo(status, 'status');
  },
  thread_id: function(){
    return this.belongsTo(thread, 'threads');
  }
});

var Threads = db.Collection.extend({
  model: Thread
});

var threads = new Threads();

module.exports = {Collection: threads, Model: Thread};