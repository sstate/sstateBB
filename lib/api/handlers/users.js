'use strict';

var Users = require('./../../../collections/users').Collection;
var User = require('./../../../collections/users').Model;

exports.users = function(request, reply){
  var page = request.url.query.page;
  var offset;
  if (page){
    offset = request.url.query.page.offset ? request.url.query.page.offset : '0';
  }
  Users
    .query('where', 'status', '=', 'active')
    .query('orderBy', 'id')
    .query('offset', offset)
    .query('limit', '10')
    .fetch()
    .then(function(users){
      return reply(users.safe()).type('application/json');
    });
};

exports.userById = function(request, reply){
  var id = request.params.id ? request.params.id : 0;
  Users
    .query('where', 'id', '=', id)
    .fetch({withRelated: ['threads', 'posts']})
    .then(function(users){
      return reply(users.safe({
        profile: true
      })).type('application/json');
    });
};