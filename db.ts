import postgres from "postgresjs/mod.js";
import { PGDATABASE, PGHOST, PGPASSWORD, PGUSER } from "./env.ts";

export const db = postgres({
  database: PGDATABASE,
  hostname: PGHOST,
  password: PGPASSWORD,
  username: PGUSER,
  debug: true,
  ssl: true,
});
