'use strict';
var LCARS = require('lcars');
var RequestConstants = require('./../constants/RequestConstants');
var merge = require('amp-merge');

var _dispatchOptimisticAction = function(request_settings) {
  var action = {
    type: request_settings.action_type_optimistic,
    options: request_settings.action_options,
    data: request_settings.data
  };

  if (typeof request_settings.action_options === 'object' && typeof request_settings.action_options.request_id !== 'undefined') {
    action.request = {
      id: request_settings.action_options.request_id,
      state: RequestConstants.States.REQUEST_STATE_LOADING,
      status: RequestConstants.Statuses.REQUEST_STATUS_UNDEFINED,
      status_code: undefined
    };

    if (typeof request_settings.action_type_optimistic !== 'undefined') {
      action.request.status = RequestConstants.Statuses.REQUEST_STATUS_OPTIMISTIC_SUCCESS;
    }
  }
  LCARS.dispatch(action);
};

var _dispatchSuccessAction = function(request_settings, api_data, status_code) {
  var action = {
    type: request_settings.action_type_success,
    options: request_settings.action_options,
    data: api_data
  };
  if (typeof request_settings.action_options === 'object' && typeof request_settings.action_options.request_id !== 'undefined') {
    action.request = {
      id: request_settings.action_options.request_id,
      state: RequestConstants.States.REQUEST_STATE_DONE,
      status: RequestConstants.Statuses.REQUEST_STATUS_SUCCESS,
      status_code: status_code
    };
  }
  LCARS.dispatch(action);
};

var _dispatchErrorAction = function(request_settings, api_data, status_code) {
  var action = {
    type: request_settings.action_type_error,
    options: request_settings.action_options,
    data: api_data
  };
  if (typeof request_settings.action_options === 'object' && typeof request_settings.action_options.request_id !== 'undefined') {
    action.request = {
      id: request_settings.action_options.request_id,
      state: RequestConstants.States.REQUEST_STATE_DONE,
      status: RequestConstants.Statuses.REQUEST_STATUS_ERROR,
      status_code: status_code
    };
  }
  LCARS.dispatch(action);
};

var RequestActionCreator = {

  request: function(settings){
    var request = new XMLHttpRequest();
    request.open(settings.type, settings.url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        if (settings.dataType.toLowerCase() === 'json'){
          settings.success(JSON.parse(request.responseText), request.status, request.response);
        }
      } else {
        if (settings.dataType.toLowerCase() === 'json'){
          settings.error(JSON.parse(request.responseText), request.status, request.response);
        }
      }
    };
    request.onerror = function() {
      throw new Error('There was a problem with the request');
    };
    request.send();
  },
  ajax: function(settings) {
    var default_settings = {
      type: 'GET',
      dataType: 'json'
    };

    settings = merge(default_settings, settings);

    _dispatchOptimisticAction(settings);

    this.request({
      type: settings.type,
      url: settings.url,
      data: settings.data,
      dataType: settings.dataType,
      beforeSend: settings.beforeSend,
      success: function(data, status_text, xhr) {
        _dispatchSuccessAction(settings, data, xhr.status);
      },
      error: function(response_text, status, xhr) {
        _dispatchErrorAction(settings, response_text, status, xhr);
      }
    });
  }
};

module.exports = RequestActionCreator;