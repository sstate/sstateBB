var node_env = process.env.NODE_ENV || 'DEV';

var db_config = require('./../knexfile');
var knex;

switch(node_env){
  case 'DEV':
    knex = require('knex')(db_config.development);
    break;
  case 'PRODUCTION':
    knex = require('knex')(db_config.production);
    break;
}

var db = require('bookshelf')(knex);

module.exports = db;