'use strict';

var ReactHelpers = require('react-hapi-jade-helper');
var Layout = require('./../components/Layout');
var Admin = require('./../components/admin/Admin');
var Index = require('./../components/admin/Index');
var UsersComponent = require('./../components/admin/Users');
var auth = require('./auth/auth');

var Users = require('./../collections/users').Collection;
var User = require('./../collections/users').Model;

exports.index = function(request, reply){
  var ctx = {};
  ctx.sessionId = request.session.get('user-id');
  ctx.sessionUsername = request.session.get('username');
  ctx.user_role = request.session.get('user_role');
  ctx.privileges = request.session.get('privileges');
  ctx.crumb = request.plugins.crumb;
  ctx.child_view = Index;
  return ReactHelpers.reactLayoutHandler({
    Layout: Layout,
    reply: reply,
    jadeLayout: 'index',
    component: Admin,
    layoutData: ctx
  });
};

exports.users = function(request, reply){
  var ctx = {};
  ctx.sessionId = request.session.get('user-id');
  ctx.sessionUsername = request.session.get('username');
  ctx.user_role = request.session.get('user_role');
  ctx.privileges = request.session.get('privileges');
  ctx.crumb = request.plugins.crumb;
  ctx.child_view = UsersComponent;
  ctx.user_roles = auth.user_roles;
  Users
    .fetch({withRelated: ['user_role']})
    .then(function(collection){
      console.log(collection);
      ctx.users = collection.toJSON();
      return ReactHelpers.reactLayoutHandler({
        Layout: Layout,
        reply: reply,
        jadeLayout: 'index',
        component: Admin,
        layoutData: ctx
      });
    });
};