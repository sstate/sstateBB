'use strict';
var Users = require('./../../../collections/users').Collection;

exports.users = function(request, reply, options){
  options = options || {};
  var page = request.url.query.page;
  var offset;
  if (page){
    offset = request.url.query.page.offset ? request.url.query.page.offset : 0;
  }
  Users
    .query('orderBy', 'id')
    .query('offset', offset)
    .query('limit', '10')
    .fetch({withRelated: ['user_role', 'status']})
    .then(function(users){
      if (options.internal){
        return options.callback(users.safe({profile: true}));
      }else {
        return reply(users.safe()).type('application/json');
      }
    });
};

exports.userById = function(request, reply, options){
  options = options || {};
  var id = request.params.id ? request.params.id : 0;
  Users
    .query('where', 'id', '=', id)
    .fetch({withRelated: ['user_role', 'status', 'threads', 'posts']})
    .then(function(users){
      if (options.internal){
        return users.safe({profile: true});
      }else {
        return reply(users.safe({
          profile: true
        })).type('application/json');
      }
    });
};

exports.updateUserById = function(request, reply, options){
  options = options || {};
  var id = request.params.id ? request.params.id : 0;
  Users
    .query('where', 'id', '=', id)
    .fetch({withRelated: ['user_role', 'status', 'threads', 'posts']})
    .then(function(users){
      if (options.internal){
        return users.safe({profile: true});
      }else {
        return reply(users.safe({
          profile: true
        })).type('application/json');
      }
    });
};