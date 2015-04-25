'use strict';

var keyMirror = require('react/lib/keyMirror');

var AdminConstants = {
  Users: keyMirror({
    GET_USERS_SUCCEDED: null,
    GET_USERS_OPTIMISTIC: null,
    GET_USERS_FAIL: null,
    GET_USER_ROLES_SUCCEDED: null,
    GET_USER_ROLES_OPTIMISTIC: null,
    GET_USER_ROLES_FAIL: null
  })
};

module.exports = AdminConstants;