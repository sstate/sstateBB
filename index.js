'use strict';
require('node-jsx').install();
var http = require('http');
var path = require('path');
var Hapi = require('hapi');
var Joi = require('joi');
var Boom = require('boom');
var _ = require('lodash');

var conf = require('./lib/conf');
var auth = require('./lib/auth/auth');
var schema = require('./lib/schema');
var auth_services = require('./lib/auth/services');
var db = require('./lib/db');
var services = require('./lib/services');
var admin = require('./lib/admin');
var apiUserRoutes = require('./lib/api/routes/users');

var server = new Hapi.Server();

if (!conf.get('port')) {
  console.error('\n\'port\' is a required local.json field');
  console.error('If you don\'t have a local.json file set up, please copy local.json-dist and fill in your config info before trying again\n');
}

server.connection({
  host: conf.get('domain'),
  port: conf.get('port')
});

server.views({
  engines: {
    jade: require('jade')
  },
  isCached: process.env.node === 'production',
  path: path.join(__dirname, '/lib/views'),
  compileOptions: {
    pretty: true
  }
});

var routes = [
  {
    method: 'GET',
    path: '/',
    handler: services.index
  },
  {
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  },
  {
    method: 'GET',
    path: '/logout',
    handler: auth_services.logout
  },
  {
    method: 'POST',
    path: '/authenticate',
    handler: auth_services.authenticate,
    config: {
      validate: {
        payload: schema.login
      }
    }
  },
  {
    method: 'GET',
    path: '/create_admin',
    handler: auth_services.createAdmin
  },
  {
    method: 'POST',
    path: '/create_admin/new',
    handler: auth_services.createAdminNew
  },
  {
    method: 'GET',
    path: '/admin',
    handler: admin.index
  },
  {
    method: 'GET',
    path: '/admin/users',
    handler: admin.users
  },
  {
    method: 'GET',
    path: '/auth/a',
    handler: auth_services.admin_login
  },
  {
    method: 'GET',
    path: '/auth/twitter',
    handler: auth_services.twitter
  },
  {
    method: 'GET',
    path: '/auth/twitter/callback',
    handler: auth_services.twitter_callback
  }
];

var options = {
  cookieOptions: {
    password: conf.get('cookie'),
    isSecure: false,
    clearInvalid: true
  }
};

server.ext('onPreResponse', function (request, reply) {
  var response = request.response;
  if (!response.isBoom) {
    if (['/profile', '/messages', '/chat', '/posts', '/links', '/users',
          '/deleteaccount', '/post', '/profile/export.json',
          '/profile/export.csv'].indexOf(request.path) > -1) {
      if (!request.session.get('session_id')) {
        return reply.redirect('/');
      }
    }


    if (request.path.indexOf('/admin') > -1) {
      if (request.session.get('user_role') !== 'admin') {
        return reply.redirect('/');
      }
    }

    return reply.continue();
  }

  var error = response;
  var ctx = {};

  var message = error.output.payload.message;
  var statusCode = error.output.statusCode || 500;
  ctx.code = statusCode;
  ctx.httpMessage = http.STATUS_CODES[statusCode].toLowerCase();

  switch (statusCode) {
    case 404:
      ctx.reason = 'page not found';
      break;
    case 403:
      ctx.reason = 'forbidden';
      break;
    case 500:
      ctx.reason = 'something went wrong';
      break;
    default:
      break;
  }

  if (process.env.npm_lifecycle_event === 'dev') {
    console.log(error.stack || error);
  }

  if (ctx.reason) {
    // Use actual message if supplied
    ctx.reason = message || ctx.reason;
    return reply.view('error', ctx).code(statusCode);
  } else {
    ctx.reason = message.replace(/\s/gi, '+');
    reply.redirect(request.path + '?err=' + ctx.reason);
  }
});

if (process.env.NODE_ENV !== 'test') {
  server.register({
    register: require('crumb')
  }, function (err) {
    if (err) {
      throw err;
    }
  });
}

server.register([{
  register: require('yar'),
  options: options
}], function (err) {
  if (err) {
    throw new Error(err.message);
  }
});

server.route(_.union(routes, apiUserRoutes));
server.start(function (err) {
  if (err) {
    throw new Error(err.message);
  }
});
