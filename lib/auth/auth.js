'use strict';
var quickAuthUtils = require('quick-auth-utils');
var db = require('./../db');
var conf = require('./../conf');
var Boom = require('boom');
var Users = require('./../../collections/users').Collection;
var user_roles = require('./../../collections/user_roles').Collection;

quickAuthUtils.extend({
  SECRET: conf.get('SECRET'),
  ITERATIONS: 4096,
  KEY_LENGTH: 20,
  DIGEST: 'sha256',
  getUser: function(hash, cb){
    var error = Boom.create(400, 'Bad user', {timestamp: Date.now()});
    if (this.checkSecureValue(hash)){
      Users.query('where', 'id', '=', hash[0])
          .fetch()
          .then(function(collection){
            cb(collection.models[0].attributes);
          });
    }else {
      cb(error);
    }
  },
  getUserRoles: function(){
    var _this = this;
    user_roles
        .fetch();
    user_roles.on('fetched', function(collection){
      _this.user_roles = collection.toJSON();
    });
  }
});

module.exports = quickAuthUtils;