'use strict';
var UserRoles = require('./../../../collections/user_roles').Collection;

exports.getUserRoles = function(cb){
  return UserRoles
    .fetch()
    .then(function(collection){
      return cb(collection.toJSON());
    });
};