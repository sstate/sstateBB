'use strict';

var React = require('react');
var Freighter = require('freighter');
var UsersStore = require('./../../stores/UsersStore');
var UserRolesStore = require('./../../stores/UserRolesStore');
var AdminActionCreator = require('./../../actions/AdminActionCreator');
var merge = require('amp-merge');

var AdminUsers = React.createClass({

  mixins: [Freighter],
  stores: [UsersStore, UserRolesStore],

  getStateFromStores: function(){
    return merge(UsersStore.getStateData().data, UserRolesStore.getStateData().data);
  },

  componentDidMount: function(){
    AdminActionCreator.getUserRoles();
    AdminActionCreator.getUsers();
  },

  render: function(){
    var data = this.state;
    var users_data = data.users.data;
    var user_roles = data.roles.data;
    var userRoles = function(){
      var roles = data.user_roles.map(function(role){
        return (
          <option key={role.id} value={role.id}>{role.name}</option>
        );
      });
      return (
        <select name="user_role">
          {roles}
        </select>
      );
    };
    var users = users_data.map(function(user){
      return (
        <form id={'user-'+user.id} key={user.id}>
          {userRoles}
          <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td><input type="text" name="status" value={user.relations.status.id}/>{user.relations.status.name}</td>
            <td><input type="text" name="user_role" value={user.relations.user_role.id}/>{user.relations.user_role.name}</td>
            <td><button type="submit">save</button></td>
          </tr>
        </form>
      );
    });
    return (
      <div>
        <table className="table-outlined table-with-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>username</th>
              <th>status</th>
              <th>role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {users}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = AdminUsers;