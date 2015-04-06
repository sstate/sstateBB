'use strict';

var keyMirror = require('react/lib/keyMirror');

var RequestConstants = {
  // Follow conventions from XHR states: http://www.w3.org/TR/XMLHttpRequest/#states
  States: keyMirror({
    REQUEST_STATE_UNSENT: null,
    REQUEST_STATE_LOADING: null,
    REQUEST_STATE_DONE: null
  }),


  Statuses: keyMirror({
    REQUEST_STATUS_UNDEFINED: null,
    REQUEST_STATUS_OPTIMISTIC_SUCCESS: null,
    REQUEST_STATUS_SUCCESS: null,
    REQUEST_STATUS_ERROR: null
  })
};

module.exports = RequestConstants;