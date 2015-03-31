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
                {!this.props.data.sessionId ?
                    <ul className="list-unstyled list-inline cf pull-right">
                      <li><a href="/login" className="button button-primary">login</a></li>
                      <li><a href="/register" className="button button-primary">register</a></li>
                    </ul>
                  :
                  <p className="pull-right spacing">Hi, {this.props.data.sessionUsername}! <a href="/logout">logout</a></p>
                }
              </div>
              <h1><a href="/">sstateBB</a></h1>
              <p>this is a bulletin booard</p>
            </div>
          </header>
          <div className="container">
            <nav className="top-nav top-nav-light cf" role="navigation">
              <ul className="list-unstyled list-inline cf">
                {this.props.data.user_role === 'admin' ? <li><a href="/admin">admin</a></li> : ''}
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