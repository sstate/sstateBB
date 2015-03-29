'use strict';
var node_env = process.env.NODE_ENV || 'development';
var conf = require('./../../conf');
var url;
switch(node_env){
  case 'development':
    url = conf.get('protocol')+'://'+conf.get('domain')+':'+conf.get('port');
    break;
  case 'staging':
    url = conf.get('protocol')+'://'+conf.get('publicDomain');
    break;
  case 'production':
    url = conf.get('protocol')+'://'+conf.get('publicDomain');
    break;
}

exports.root = function(){
  return url;
};

exports.apiUrl = function(string){
  return '/api'+string;
};
