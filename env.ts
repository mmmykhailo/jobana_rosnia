import { raise } from "./utils.ts";

export const BOT_TOKEN =
  Deno.env.get("BOT_TOKEN") ?? raise("No BOT_TOKEN variable");

export const PUBLIC_URL =
  Deno.env.get("PUBLIC_URL") ?? raise("No PUBLIC_URL variable");

export const DATABASE_URL =
  Deno.env.get("DATABASE_URL") ?? raise("No DATABASE_URL variable");
