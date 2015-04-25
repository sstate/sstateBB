'use strict';
var LCARS = require('lcars');
var AdminConstants = require('./../constants/AdminConstants');
var ApiActionCreator = require('./ApiActionCreator');

var AdminActionCreator = {
  getUsers: function(action_options){
    ApiActionCreator.request({
      type: 'GET',
      url: '/users',
      action_options: action_options,
      action_type_success: AdminConstants.Users.GET_USERS_SUCCEDED,
      action_type_optimistic: AdminConstants.Users.GET_USERS_OPTIMISTIC,
      action_type_error: AdminConstants.Users.GET_USERS_FAIL
    });
  },
  getUserRoles: function(action_options){
    ApiActionCreator.request({
      type: 'GET',
      url: '/user_roles',
      action_options: action_options,
      action_type_success: AdminConstants.Users.GET_USER_ROLES_SUCCEDED,
      action_type_optimistic: AdminConstants.Users.GET_USER_ROLES_OPTIMISTIC,
      action_type_error: AdminConstants.Users.GET_USER_ROLES_FAIL
    });
  }
};

module.exports = AdminActionCreator;