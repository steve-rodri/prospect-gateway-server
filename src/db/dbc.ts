import knex from "knex";
import { DB_HOST } from "../constants";

const dbc = knex({
  client: "pg",
  connection: {
    host: DB_HOST,
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "test",
  },
});

export default dbc;
