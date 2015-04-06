'use strict';

var ReactHelpers = require('react-hapi-jade-helper');
var Layout = require('./../components/Layout');
var Admin = require('./../components/admin/Admin');
var Index = require('./../components/admin/Index');
var auth = require('./auth/auth');
var Users = require('./../collections/users').Collection;
var User = require('./../collections/users').Model;

exports.index = function(request, reply){
  var ctx = {};
  ctx.session_id = request.session.get('session_id');
  ctx.user_role = request.session.get('user_role');
  ctx.status = request.session.get('status');
  ctx.avatar_url = request.session.get('avatar_url');
  ctx.twitter_user = request.session.get('twitter_user');
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
  ctx.session_id = request.session.get('session_id');
  ctx.user_role = request.session.get('user_role');
  ctx.status = request.session.get('status');
  ctx.avatar_url = request.session.get('avatar_url');
  ctx.twitter_user = request.session.get('twitter_user');
  ctx.crumb = request.plugins.crumb;
  return ReactHelpers.reactLayoutHandler({
    Layout: Layout,
    reply: reply,
    jadeLayout: 'index',
    component: Admin,
    layoutData: ctx
  });
};