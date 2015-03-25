'use strict';

window.process = {
  env: {
    NODE_ENV: 'production'
  }
};

var React = require('react');
var Router = require('react-router');

var port = location.port ? ':' + location.port : '';

var Layout = require('./../../components/Layout');
var Index = require('./../../components/Index');
var Login = require('./../../components/Login');
var Register = require('./../../components/Register');
var AdminController = require('./../../components/admin/Admin');
var AdminIndex = require('./../../components/admin/Index');
var AdminUsers = require('./../../components/admin/Users');

var routes = (
    <Router.Route handler={Layout}>
      <Router.DefaultRoute handler={Index} />
      <Router.Route name="login" handler={Login} />
      <Router.Route name="admin" handler={AdminController}>
        <Router.Route name="users" path="users" handler={AdminUsers} />
      </Router.Route>
    </Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.getElementById('main'));
});