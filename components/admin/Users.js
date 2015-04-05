'use strict';

var React = require('react');

var AdminUsers = React.createClass({

  render: function(){
    var data = this.props.data;

    //var userRoles = _.each(data.user_roles, function(role){
    //  return (
    //    <option value={role}>{role}</option>
    //  );
    //});
    console.log(data.user_roles)
    var users = data.users.map(function(user){
      return (
        <form id={'user-'+user.id} key={user.id}>
          <select name="user_role">

          </select>
          <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td><input type="text" name="status" value={user.status}/></td>
            <td><input type="text" name="user_role" value={user.user_role}/></td>
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
                <th>#id</th>
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