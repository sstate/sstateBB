'use strict';
var threads = require('./threads').Model;
var posts = require('./posts').Model;
var _ = require('lodash');
var urlUtil = require('./../lib/api/util/url');

var db = require('./../lib/db');

var User = db.Model.extend({
  tableName: 'bb_users',
  hasTimestamps: true,
  posts: function(){
    return this.belongsTo(posts, 'posts');
  },
  threads: function(){
    return this.belongsTo(threads, 'threads');
  },
  latest_threads: function(){
    return this.threads().query('orderBy', 'id').query('limit', '10');
  },
  apiUrl: function(){
    return urlUtil.root()+'/api/users/'+this.get('id');
  },
  safe: function(){
    return _.merge({
      links: {
        self: this.apiUrl()
      },
      id: this.get('id'),
      email: this.get('email'),
      username: this.get('username'),
      user_role: this.get('user_role'),
      status: this.get('status')
    }, this.relations);
  },
  safe_for_users_list: function(){
    return {
      links: {
        self: this.apiUrl()
      },
      id: this.get('id'),
      email: this.get('email'),
      username: this.get('username'),
      user_role: this.get('user_role'),
      status: this.get('status')
    };
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
    _.each(this.models, function(model){
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