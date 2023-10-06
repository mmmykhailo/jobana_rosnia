import postgres from "postgresjs/mod.js";
import { DATABASE_URL } from "./env.ts";

export const db = postgres(DATABASE_URL, {
  ssl: true,
  types: {
    bigint: postgres.BigInt,
  },
});
