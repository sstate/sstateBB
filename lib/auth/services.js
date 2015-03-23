var Users = require('./../../collections/users').Collection;
var Layout = require('./../../components/Layout');
var Register = require('./../../components/Register');
var Login = require('./../../components/Login');
var Boom = require('boom');
var auth = require('./auth');
var conf = require('./../conf');
var user_roles = require('./../../collections/user_roles').Collection;
var statuses = require('./../../collections/status').Collection;
var User = require('./../../collections/users').Model;
var ReactHelpers = require('react-hapi-jade-helper');
var _ = require('lodash');

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
          user_roles
              .query('where', 'name', '=', 'reader')
              .fetch()
              .then(function(){
                statuses
                    .query('where', 'name', '=', 'active')
                    .fetch()
                    .then(function(){
                      ctx.user_role = user_roles.toJSON()[0].id;
                      ctx.status = statuses.toJSON()[0].id;
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
                            })
                      });
                    });
              });
        }
      });
};

exports.register = function(request, reply){
  var ctx = {};
  ctx.crumb = request.plugins.crumb;
  ctx.sessionId = request.session.get('user-id');
  ctx.sessionUsername = request.session.get('username');
  return ReactHelpers.reactLayoutHandler({
    Layout: Layout,
    reply: reply,
    jadeLayout: 'index',
    component: Register,
    layoutData: ctx
  });
};

exports.login = function(request, reply){
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
  console.log(request.payload)
  ctx.crumb = request.plugins.crumb;
  Users.query('where', 'email', '=', request.payload.email)
      .fetch()
      .then(function(collection){
        var userObject = collection.models[0].attributes;
        if (collection.length > 0){
          var options = {
            key: request.payload.email,
            password: request.payload.password,
            salt: userObject.password.split('|')[1]
          };
          auth.makePasswordHash(options, function(passwordHash){
            if (passwordHash === userObject.password){
              request.session.set('user-id', auth.makeSecureValue(userObject.id.toString()));
              request.session.set('username', userObject.username);
              request.session.set('user_role', userObject.user_role);
              _.each(auth.user_roles, function(v){
                if (v.id === userObject.user_role){
                  request.session.set('privileges', v.name);
                }
              });
              reply.redirect('/');
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
    return user_roles
        .query('where', 'name', '=', 'admin')
        .fetch()
        .then(function(){
          statuses
              .query('where', 'name', '=', 'active')
              .fetch()
              .then(function(){
                reply.view('create_admin',
                    {
                      user_roles: user_roles.toJSON(),
                      statuses: statuses.toJSON(),
                      crumb: request.plugins.crumb
                    });
              });
        });
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
      var user = new User({
        email: request.payload.email,
        username: request.payload.username,
        password: passwordHash,
        user_role: request.payload.user_role,
        status: request.payload.status
      });
      user.save()
          .then(function(){
            return reply.redirect('/create_admin');
          })
    });
  }
};
