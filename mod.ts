/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import "$std/dotenv/load.ts";

import { oakCors } from "cors/mod.ts";
import { Application, Router } from "oak/mod.ts";
import { bot, handleUpdates } from "./bot.ts";
import { PUBLIC_URL } from "./env.ts";
import { db } from "./db.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "Welcome to Jobana rusnia bot";
  })
  .post(`/${bot.token}`, handleUpdates);

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log(
  await (
    await fetch(
      `https://api.telegram.org/bot${bot.token}/setWebhook?url=${PUBLIC_URL}/${bot.token}`,
    )
  ).text(),
);

app.addEventListener("listen", async () => {
  console.log("listening");
  await db`
    create table if not exists groups (
      "id" uuid default gen_random_uuid() primary key,
      "chat_id" bigint not null,
      "count" integer default 0,
      "created_at" timestamp with time zone default current_timestamp not null,
      "updated_at" timestamp with time zone default current_timestamp not null,
      unique("chat_id")
    );
  `;
});

await app.listen({ port: 8000 });
