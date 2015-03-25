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
          <div className="header">
            <div className="container">
              <h1 className="logo"><a href="/">sstateBB</a></h1>
              <ul className="nav">
              {!this.props.data.sessionId ? <li><a href="/login">login</a></li> : ''}
              {!this.props.data.sessionId ? <li><a href="/register">register</a></li> : ''}
              {this.props.data.sessionId ? <li>Hi, {this.props.data.sessionUsername} <a href="/logout">logout</a></li> : ''}
              </ul>
            {!this.props.data.sessionId ?
                <Login data={this.props.data}/> : ''}
            </div>
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