'use strict';

var merge = require('amp-merge');
var RequestActionCreator = require('./RequestActionCreator');

var ApiActionCreator = {
  request: function(settings) {
    var api_settings = merge(settings, {
      url: window.location.origin+'/api' + settings.url,
      beforeSend: function (xhr){
        xhr.setRequestHeader('Accept', 'application/json, text/javascript');
      }
    });
    return RequestActionCreator.request(api_settings);
  }
};

module.exports = ApiActionCreator;