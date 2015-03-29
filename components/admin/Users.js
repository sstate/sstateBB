'use strict';
var _ = require('lodash');

var React = require('react');

var AdminUsers = React.createClass({

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
    var users = this.props.data.users.map(function(user){
      return (<li key={user.id}>{user.username} | {user.email} | {user.status} | {user.user_role}</li>);
    });
    return (
        <div>
          <ul>
            {users}
          </ul>
        </div>
    );
  }
});

module.exports = AdminUsers;