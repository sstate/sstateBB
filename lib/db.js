var node_env = process.env.NODE_ENV || 'development';

var db_config = require('./../knexfile');
var knex;

switch(node_env){
  case 'development':
    knex = require('knex')(db_config.development);
    break;
  case 'staging':
    knex = require('knex')(db_config.staging);
    break;
  case 'production':
    knex = require('knex')(db_config.production);
    break;
}

var db = require('bookshelf')(knex);

module.exports = db;