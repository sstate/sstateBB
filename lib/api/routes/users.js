var usersHandlers = require('./../handlers/users');
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
    method: 'PUT',
    path: urlUtil.apiUrl('/users/{id}'),
    handler: usersHandlers.updateUserById
  }
];