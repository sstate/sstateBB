'use strict';

var ReactHelpers = require('react-hapi-jade-helper');
var Layout = require('./../components/Layout');
var Admin = require('./../components/admin/Admin');
var Index = require('./../components/admin/Index');
var Users = require('./../components/admin/Users');

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
  ctx.child_view = Users;
  return ReactHelpers.reactLayoutHandler({
    Layout: Layout,
    reply: reply,
    jadeLayout: 'index',
    component: Admin,
    layoutData: ctx
  });
};