'use strict';

var ReactHelpers = require('react-hapi-jade-helper');
var Layout = require('./../components/Layout');
var Index = require('./../components/Index');
var auth = require('./../lib/auth/auth');

exports.index = function(request, reply){
  var ctx = {};
  ctx.session_id = request.session.get('session_id');
  ctx.user_role = request.session.get('user_role');
  ctx.avatar_url = request.session.get('avatar_url');
  ctx.twitter_user = request.session.get('twitter_user');
  ctx.crumb = request.plugins.crumb;
  return ReactHelpers.reactLayoutHandler({
    Layout: Layout,
    reply: reply,
    jadeLayout: 'index',
    component: Index,
    layoutData: ctx
  });
};