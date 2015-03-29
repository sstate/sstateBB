'use strict';
var quickAuthUtils = require('quick-auth-utils');
var _ = require('lodash');
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
  }
});

module.exports = quickAuthUtils;