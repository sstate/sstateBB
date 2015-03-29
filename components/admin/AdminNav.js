'use strict';

var React = require('react');

var AdminNav = React.createClass({

  propTypes: {
    //scroll: React.PropTypes.bool
  },

  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
  },

  componentWillUnmount: function(){
  },

  render: function(){
    return (
      <div>
        <ul className="nav">
          <li><a href="/admin">admin</a></li>
          <li><a href="/admin/users">users</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = AdminNav;