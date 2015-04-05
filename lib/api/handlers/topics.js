'use strict';

var Topics = require('./../../../collections/topics').Collection;

exports.topics = function(request, reply, options){
  options = options || {};
  var page = request.url.query.page;
  var offset;
  if (page){
    offset = request.url.query.page.offset ? request.url.query.page.offset : '0';
  }
  Topics
    .query('where', 'status', '=', 'active')
    .query('orderBy', 'id')
    .query('offset', offset)
    .query('limit', '10')
    .fetch()
    .then(function(topics){
      if (options.internal){
        return topics;
      }else {
        return reply(topics).type('application/json');
      }
    });
};

exports.topicById = function(request, reply, options){
  options = options || {};
  var id = request.params.id ? request.params.id : 0;
  Topics
    .query('where', 'id', '=', id)
    .fetch({withRelated: ['author_id', 'status']})
    .then(function(users){
      if (options.internal){
        return users.safe({profile: true});
      }else {
        return reply(users.safe({
          profile: true
        })).type('application/json');
      }
    });
};