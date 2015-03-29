'use strict';

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Inserts seed entries
    knex('status').del(),
    knex('user_roles').del(),

    knex('status').insert({name: 'active'}),
    knex('status').insert({name: 'inactive'}),
    knex('status').insert({name: 'banned'}),
    knex('status').insert({name: 'archived'}),

    knex('user_roles').insert({name: 'reader'}),
    knex('user_roles').insert({name: 'moderator'}),
    knex('user_roles').insert({name: 'admin'}),
    knex.raw('CREATE UNIQUE INDEX CONCURRENTLY ON bb_users(email, username, password, status, user_role, created_at, updated_at)')
  );
};
