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


exports.logout = function (request, reply) {
  request.session.reset();
  reply.redirect('/');
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
  var role = conf.get('disableCreateAdmin') ? 'reader' : 'admin';
  var ctx = {};
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
            .fetch({withRelated: ['user_role', 'status']})
            .then(function(collection){
              if (collection.length > 0){
                user = collection.models[0];
                request.session.set('session_id', user.get('id'));
                request.session.set('user_role', user.related('user_role'));
                request.session.set('status', user.related('status'));
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
                      user_roles
                        .query('where', 'name', '=', role)
                        .fetch()
                        .then(function(u){
                          var user_role = u.models[0].toJSON();
                          ctx.user_role = user_role.id;
                          statuses
                            .query('where', 'name', '=', 'active')
                            .fetch()
                            .then(function(s){
                              console.log(s.attributes, '||||||||||||||||||||||||||')
                              var status = s.models[0].toJSON();
                              ctx.status = status.id;
                              user = new User({
                                avatar_url: JSON.parse(d).profile_image_url_https || '',
                                username: results.screen_name,
                                twitter_id: results.user_id,
                                user_role: ctx.user_role,
                                status: ctx.status
                              });
                              user.save()
                                .then(function(){
                                  request.session.set('session_id', user.get('id'));
                                  request.session.set('user_role', user_role);
                                  request.session.set('status', status);
                                  request.session.set('avatar_url', user.get('avatar_url'));
                                  request.session.set('twitter_user', results);
                                  return reply.redirect('/');
                                });
                            });
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
