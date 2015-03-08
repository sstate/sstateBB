var conf = require('./lib/conf');

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './../../db/' + conf.db
  }
});
