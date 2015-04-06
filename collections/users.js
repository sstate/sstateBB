'use strict';
var Thread = require('./threads').Model;
var Post = require('./posts').Model;
var user_role = require('./user_roles').Model;
var status = require('./status').Model;
var each = require('lodash.foreach');
var merge = require('amp-merge');
var urlUtil = require('./../lib/api/util/url');

var db = require('./../lib/db');

var User = db.Model.extend({
  tableName: 'bb_users',
  hasTimestamps: true,
  posts: function(){
    return this.hasMany(Post, 'author_id');
  },
  threads: function(){
    return this.hasMany(Thread, 'author_id');
  },
  latest_threads: function(){
    return this.threads().query('orderBy', 'id').query('limit', '10');
  },
  apiUrl: function(){
    return urlUtil.root()+'/api/users/'+this.get('id');
  },
  user_role: function(){
    return this.belongsTo(user_role, 'user_role');
  },
  status: function(){
    return this.belongsTo(status, 'status');
  },
  safe: function(){
    return merge({
      links: {
        self: this.apiUrl()
      },
      id: this.get('id'),
      username: this.get('username')
    }, {relations: this.relations});
  },
  safe_for_users_list: function(){
    return merge({
      links: {
        self: this.apiUrl()
      },
      id: this.get('id'),
      username: this.get('username')
    }, {relations: this.relations});
  }
});

var Users = db.Collection.extend({
  model: User,
  apiUrl: urlUtil.root()+'/api/users',
  safe: function(options){
    var options = options || {};
    var data = {};
    data.meta = {
      length: this.length
    };
    data.links = {
      self: this.apiUrl
    };
    if (options.profile){
      data.links = {
        parent: this.apiUrl
      };
    }else {
      data.links = {
        self: this.apiUrl
      };
    }
    data.data = [];
    each(this.models, function(model){
      if (options.profile){
        data.data.push(model.safe());
      }else {
        data.data.push(model.safe_for_users_list());
      }
    });
    return data;
  }
});

var users = new Users();

module.exports = {Collection: users, Model: User};