import * as knex from 'knex';

const dbc = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'test',
  }
});


export default dbc;