'use strict';

var db = require('./../lib/db');
var User = require('./users').Model;
var urlUtil = require('./../lib/api/util/url');
var each = require('lodash.foreach');
var merge = require('amp-merge');

var Role = db.Model.extend({
  tableName: 'user_roles',
  hasTimestamps: true,
  apiUrl: function(){
    return urlUtil.root()+'/api/user_roles/'+this.get('id');
  },
  safe: function(){
    return merge({
      links: {
        self: this.apiUrl()
      },
      id: this.get('id'),
      name: this.get('name')
    });
  }
});

var User_Roles = db.Collection.extend({
  model: Role,
  apiUrl: urlUtil.root()+'/api/user_roles/',
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
      data.data.push(model.safe());
    });
    return data;
  }
});

var user_roles = new User_Roles();

module.exports = {Collection: user_roles, Model: Role};