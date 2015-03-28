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
      var user_role = _.where(this.props.data.user_roles, {id: user.user_role});
      return (<li key={user.id}>{user.username} | {user.email} | {user.status} | {user_role[0].name}</li>);
    }.bind(this));
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