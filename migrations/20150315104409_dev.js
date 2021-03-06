'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('status', function(table){
    table.increments('id').primary().notNullable();
    table.string('name', [150]).unique().notNullable();
  })
    .createTable('user_roles', function(table){
    table.increments('id').primary().notNullable();
    table.string('name', [150]).unique().notNullable();
  })
    .createTable('bb_users', function(table) {
    table.increments('id').primary().notNullable();
    table.string('email', [254]);
    table.string('username', [20]).notNullable();
    table.integer('status').references('status.id').notNullable();
    table.integer('user_role').references('user_roles.id').notNullable();
    table.string('twitter_id').notNullable();
    table.string('avatar_url');
    table.timestamps();
  })
    .createTable('topics', function(table){
    table.increments('id').primary().notNullable();
    table.string('title').notNullable();
    table.date('published_at').notNullable();
    table.integer('author_id').references('bb_users.id').notNullable();
    table.string('status').notNullable();
    table.timestamps();
  })
    .createTable('threads', function(table){
    table.increments('id').primary().notNullable();
    table.string('title').notNullable();
    table.integer('topic').references('topics.id').notNullable();
    table.date('published_at').notNullable();
    table.integer('author_id').references('bb_users.id').notNullable();
    table.string('status').notNullable();
    table.timestamps();
  })
    .createTable('posts', function(table){
    table.increments('id').primary();
    table.string('body', [500]).notNullable();
    table.integer('thread_id').references('threads.id').notNullable();
    table.integer('author_id').references('bb_users.id').notNullable();
    table.string('status').notNullable();
    table.timestamps();
  })
    .raw('CREATE UNIQUE INDEX CONCURRENTLY ON bb_users(email, username, twitter_id, status, user_role, created_at, updated_at)');
};

//table.integer('threads').references('threads.id');
//table.integer('posts').references('posts.id');

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bb_users')
      .dropTable('topics')
      .dropTable('threads')
      .dropTable('posts')
      .dropTable('status')
      .dropTable('user_roles');
};
