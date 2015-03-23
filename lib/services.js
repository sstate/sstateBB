var ReactHelpers = require('react-hapi-jade-helper');
var Layout = require('./../components/Layout');
var Index = require('./../components/Index');
var auth = require('./../lib/auth/auth');

exports.index = function(request, reply){
  var ctx = {};
  ctx.sessionId = request.session.get('user-id');
  ctx.sessionUsername = request.session.get('username');
  ctx.user_role = request.session.get('user_role');
  ctx.privileges = request.session.get('privileges');
  ctx.crumb = request.plugins.crumb;
  console.log(ctx);
  return ReactHelpers.reactLayoutHandler({
    Layout: Layout,
    reply: reply,
    jadeLayout: 'index',
    component: Index,
    layoutData: ctx
  });
};