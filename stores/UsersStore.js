'use strict';

var LCARS = require('lcars');
var CargoBay = require('cargo-bay');
var merge = require('amp-merge');
var AdminConstants = require('./../constants/AdminConstants');

var Userdata = {
  _data: {
    data: {
      users: {
        data: []
      }
    }
  },
  clonedData: function() {
    return JSON.parse(JSON.stringify(this._data));
  }
};

var UsersStore = merge(CargoBay, {
  getUsers: function(data){
    Userdata._data.data.users = data;
    return Userdata.clonedData();
  },
  getStateData: function(){
    return Userdata.clonedData();
  }
});

UsersStore.dispatchToken = LCARS.register(function(action){
  switch(action.type){
    case AdminConstants.Users.GET_USERS_SUCCEDED:
      UsersStore.getUsers(action.data);
      UsersStore.emitChange();
      break;
  }
});

module.exports = UsersStore;