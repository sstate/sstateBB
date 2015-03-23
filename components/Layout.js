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
          <header>
            <p><a href="/">sstateBB</a></p>
            <ul>
              {!this.props.data.sessionId ? <li><a href="/login">login</a></li> : ''}
              {!this.props.data.sessionId ? <li><a href="/register">register</a></li> : ''}
              {this.props.data.sessionId ? <li><a href="/logout">logout</a></li> : ''}
            </ul>
            {!this.props.data.sessionId ?
                <Login data={this.props.data}/> : ''}
          </header>
          <View data={this.props.data} />
        </div>
    );
  }
});

module.exports = Layout;