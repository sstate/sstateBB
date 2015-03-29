'use strict';
var user = require('./users').Model;
var status = require('./status').Model;

var db = require('./../lib/db');

var Topic = db.Model.extend({
  tableName: 'topics',
  hasTimestamps: true,
  author_id: function(){
    return this.belongsTo(user, 'bb_users');
  },
  status: function(){
    return this.belongsTo(status, 'status');
  }
});

var Topics = db.Collection.extend({
  model: Topic
});

var topics = new Topics();

module.exports = {Collection: topics, Model: Topic};