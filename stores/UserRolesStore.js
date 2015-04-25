'use strict';

var LCARS = require('lcars');
var CargoBay = require('cargo-bay');
var merge = require('amp-merge');
var AdminConstants = require('./../constants/AdminConstants');

var Roles = {
  _data: {
    data: {
      roles: {
        data: []
      }
    }
  },
  clonedData: function() {
    return JSON.parse(JSON.stringify(this._data));
  }
};

var UserRolesStore = merge(CargoBay, {
  getRoles: function(data){
    Roles._data.data.roles = data;
    return Roles.clonedData();
  },
  getStateData: function(){
    return Roles.clonedData();
  }
});

UserRolesStore.dispatchToken = LCARS.register(function(action){
  switch(action.type){
    case AdminConstants.Users.GET_USER_ROLES_SUCCEDED:
      UserRolesStore.getRoles(action.data);
      UserRolesStore.emitChange();
      break;
  }
});

module.exports = UserRolesStore;