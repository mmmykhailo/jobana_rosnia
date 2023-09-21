import { raise } from "./utils.ts";

export const BOT_TOKEN =
  Deno.env.get("BOT_TOKEN") ?? raise("No BOT_TOKEN variable");

export const PUBLIC_URL =
  Deno.env.get("PUBLIC_URL") ?? raise("No PUBLIC_URL variable");

export const PGHOST = Deno.env.get("PGHOST") ?? raise("No PGHOST variable");
export const PGDATABASE =
  Deno.env.get("PGDATABASE") ?? raise("No PGDATABASE variable");
export const PGUSER = Deno.env.get("PGUSER") ?? raise("No PGUSER variable");
export const PGPASSWORD =
  Deno.env.get("PGPASSWORD") ?? raise("No PGPASSWORD variable");
