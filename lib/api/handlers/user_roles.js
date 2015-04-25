'use strict';
var UserRoles = require('./../../../collections/user_roles').Collection;

exports.getUserRoles = function(request, reply, options){
  return UserRoles
    .fetch()
    .then(function(collection){
      return reply(collection.safe()).type('application/json');
    });
};

exports.getUserRolesById = function(request, reply, options){
  options = options || {};
  var id = request.params.id ? request.params.id : 0;
  return UserRoles
    .query('where', 'id', '=', id)
    .fetch()
    .then(function(roles){
      if (options.internal){
        return roles.safe();
      }else {
        return reply(roles.safe()).type('application/json');
      }
    });
};