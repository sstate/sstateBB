'use strict';

var Users = require('./../../collections/users').Collection;
var User = require('./../../collections/users').Model;
var Admin = require('./../../collections/admins').Model;
var Admins = require('./../../collections/admins').Collection;
var Layout = require('./../../components/Layout');
var Register = require('./../../components/Register');
var Login = require('./../../components/Login');
var Boom = require('boom');
var auth = require('./auth');
var conf = require('./../conf');
var user_roles = require('./../../collections/user_roles').Collection;
var statuses = require('./../../collections/status').Collection;
var ReactHelpers = require('react-hapi-jade-helper');
var OAuth = require('oauth');

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  conf.get('twitter_api_token'),
  conf.get('twitter_api_secret'),
  '1.0A',
  null,
  'HMAC-SHA1'
);

exports.new_user = function(request, reply){
  var ctx = {
    email: request.payload.email,
    password: request.payload.password,
    username: request.payload.username
  };
  Users.query('where', 'email', '=', ctx.email)
      .fetch()
      .then(function(collection){
        if (collection.length > 0){
          return reply(Boom.wrap(new Error('A user with this email already exists'), 400));
        }else {
          ctx.user_role = 'reader';
          ctx.status = 'active';
          return auth.makePasswordHash({
            key: ctx.email,
            password: ctx.password
          }, function(passwordHash){
            var user = new User({
              email: ctx.email,
              username: ctx.username,
              password: passwordHash,
              user_role: ctx.user_role,
              status: ctx.status
            });
            user.save()
              .then(function(){
                return reply.redirect('/login');
              });
          });
        }
      });
};


exports.admin_login = function(request, reply){
  var ctx = {};
  ctx.crumb = request.plugins.crumb;
  ctx.sessionId = request.session.get('user-id');
  ctx.sessionUsername = request.session.get('username');

  if (ctx.sessionId){
    return reply.redirect('/');
  }else {
    return ReactHelpers.reactLayoutHandler({
      Layout: Layout,
      reply: reply,
      jadeLayout: 'index',
      component: Login,
      layoutData: ctx
    });
  }
};

exports.logout = function (request, reply) {
  request.session.reset();
  reply.redirect('/');
};

exports.authenticate = function(request, reply){
  var ctx = {};
  ctx.crumb = request.plugins.crumb;
  Admins
    .query('where', 'email', '=', request.payload.email)
    .fetch()
    .then(function(collection){
      if (collection.length > 0){
        var userObject = collection.models[0];
        var options = {
          key: request.payload.email,
          password: request.payload.password,
          salt: userObject.get('password').split('|')[1]
        };
        auth.makePasswordHash(options, function(passwordHash){
          if (passwordHash === userObject.get('password')){
            request.session.set('user-id', auth.makeSecureValue(userObject.get('id').toString()));
            request.session.set('user_role', 'admin');
            reply.redirect('/admin');
          }else {
            reply(Boom.wrap(new Error('This email or password is incorrect.'), 400));
          }
        });
      }else {
        reply(Boom.wrap(new Error('This email or password is incorrect.'), 400));
      }
    });
};


exports.createAdmin = function(request, reply){
  var ctx = {};
  ctx.crumb = request.plugins.crumb;
  if (conf.get('disableCreateAdmin')){
    return reply.redirect('/');
  }else {
    reply.view('create_admin', {crumb: request.plugins.crumb});
  }
};

exports.createAdminNew = function(request, reply){
  if (conf.get('disableCreateAdmin')){
    return reply.redirect('/');
  }else {
    return auth.makePasswordHash({
      key: request.payload.email,
      password: request.payload.password
    }, function(passwordHash){
      var user = new Admin({
        email: request.payload.email,
        password: passwordHash
      });
      user.save()
          .then(function(){
            return reply.redirect('/create_admin');
          });
    });
  }
};

exports.twitter = function(request, reply){
  oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if (error){
      return reply(Boom.wrap(new Error(error), 500));
    }else {
      request.session.set('twitter_oauth', {
        token: oauth_token,
        secret: oauth_token_secret
      });
      reply.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
    }
  });
};

exports.twitter_callback = function(request, reply){
  var twitter_oauth = request.session.get('twitter_oauth');
  if (request.session.get('twitter_oauth')){
    twitter_oauth.verifier = request.query.oauth_verifier;
    oauth.getOAuthAccessToken(
      twitter_oauth.token,
      twitter_oauth.secret,
      twitter_oauth.verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results){
        if (error){
          return reply(Boom.wrap(new Error(error), 500));
        }else {
          var user;
          twitter_oauth.oauth_access_token = oauth_access_token;
          twitter_oauth.oauth_access_token_secret = oauth_access_token_secret;
          request.session.set('twitter_oauth', twitter_oauth);
          Users.query('where', 'twitter_id', '=', results.user_id)
            .fetch()
            .then(function(collection){
              if (collection.length > 0){
                user = collection.models[0];
                request.session.set('session_id', user.get('id'));
                request.session.set('user_role', user.get('user_role'));
                request.session.set('avatar_url', user.get('avatar_url'));
                request.session.set('twitter_user', results);
                return reply.redirect('/');
              }else {
                oauth.getProtectedResource(
                  'https://api.twitter.com/1.1/users/show.json?screen_name='+results.screen_name,
                  'GET',
                  oauth_access_token,
                  oauth_access_token_secret,
                  function(e, d, r){
                    if (e){
                      return reply(Boom.wrap(new Error(e), 500));
                    }else {
                      user = new User({
                        avatar_url: JSON.parse(d).profile_image_url_https || '',
                        username: results.screen_name,
                        twitter_id: results.user_id,
                        user_role: 'reader',
                        status: 'active'
                      });
                      user.save()
                        .then(function(){
                          request.session.set('session_id', user.get('id'));
                          request.session.set('user_role', user.get('user_role'));
                          request.session.set('avatar_url', user.get('avatar_url'));
                          request.session.set('twitter_user', results);
                          return reply.redirect('/');
                        });
                    }
                  });
              }
            });
        }
      }
    );
  }else {
    reply.redirect('/login');
  }
};
