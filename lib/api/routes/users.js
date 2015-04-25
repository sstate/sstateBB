var usersHandlers = require('./../handlers/users');
var usersRolesHandlers = require('./../handlers/user_roles');
var urlUtil = require('./../util/url');

module.exports = [
  {
    method: 'GET',
    path: urlUtil.apiUrl('/users'),
    handler: usersHandlers.users
  },
  {
    method: 'GET',
    path: urlUtil.apiUrl('/users/{id}'),
    handler: usersHandlers.userById
  },
  {
    method: 'GET',
    path: urlUtil.apiUrl('/user_roles'),
    handler: usersRolesHandlers.getUserRoles
  },
  {
    method: 'GET',
    path: urlUtil.apiUrl('/user_roles/{id}'),
    handler: usersRolesHandlers.getUserRolesById
  },
  {
    method: 'PUT',
    path: urlUtil.apiUrl('/users/{id}'),
    handler: usersHandlers.updateUserById
  }
];