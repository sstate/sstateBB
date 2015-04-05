var topicsHandlers = require('./../handlers/topics');
var urlUtil = require('./../util/url');

module.exports = [
  {
    method: 'GET',
    path: urlUtil.apiUrl('/topics'),
    handler: topicsHandlers.topics
  },
  {
    method: 'GET',
    path: urlUtil.apiUrl('/topics/{id}'),
    handler: topicsHandlers.topicById
  },
  {
    method: 'POST',
    path: urlUtil.apiUrl('/topics/new'),
    handler: topicsHandlers.topicById
  }
];