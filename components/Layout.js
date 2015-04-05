'use strict';

var React = require('react');
var Router = require('react-router');
var Login = require('./Login');

var Layout = React.createClass({

  getDefaultProps: function() {
    return {
      data: global.layoutData
    };
  },

  handleSubmit: function(e){
    e.preventDefault();
  },

  render: function () {
    var View = this.props.view ? this.props.view : Router.RouteHandler;
    return (
        <div>
          <header className="banner">
            <div className="container">
              <div className="cf">
                {!this.props.data.session_id ?
                    <ul className="list-unstyled list-inline cf pull-right">
                      <li><a href="/auth/twitter" className="button button-primary">sign in with twitter</a></li>
                    </ul>
                  :
                  <p className="pull-right spacing">Hi, {this.props.data.twitter_user.screen_name}! <a href="/logout">logout</a></p>
                }
              </div>
              <h1><a href="/">sstateBB</a></h1>
              <p>this is a bulletin booard</p>
            </div>
          </header>
          <div className="container">
            <nav className="top-nav top-nav-light cf" role="navigation">
              <ul className="list-unstyled list-inline cf">
                <li><a href="/">index</a></li>
                {this.props.data.user_role === 'admin' ?
                  <li className="has-dropdown">
                    <a href="/admin">admin</a>
                    <div className="icon-arrow-down"></div>
                    <ul className='list-unstyled dropdown cf'>
                      <li><a href="/admin/users">users</a></li>
                      <li><a href="/admin/topics">topics</a></li>
                    </ul>
                  </li>
                  : ''}
              </ul>
            </nav>
          </div>
          <div className="container">
            <div className="content">
              <View data={this.props.data} />
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Layout;