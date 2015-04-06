'use strict';

var merge = require('amp-merge');
var RequestActionCreator = require('./RequestActionCreator');

var ApiActionCreator = {
  ajax: function(settings) {
    var community_settings = merge(settings, {
      url: window.location.origin+'/api' + settings.url,
      beforeSend: function (xhr){
        xhr.setRequestHeader('Accept', 'application/json, text/javascript');
      }
    });
    return RequestActionCreator.ajax(community_settings);
  }
};

module.exports = ApiActionCreator;