'use strict';

var React = require('react');
var Router = require('react-router');
var Login = require('./Login');
var Header = require('./Header');

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
    var data = this.props.data;
    var View = this.props.view ? this.props.view : Router.RouteHandler;
    return (
        <div>
          <Header data={data} />
          <div className="container">
            <nav className="top-nav top-nav-light cf" role="navigation">
              <ul className="list-unstyled list-inline cf">
                <li><a href="/">index</a></li>
                {this.props.data.user_role.name === 'admin' ?
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