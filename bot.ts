import { Bot, InlineKeyboard, webhookCallback } from "grammy/mod.ts";
import { BOT_TOKEN } from "./env.ts";
import { isPrime, pluralize, triggers } from "./utils.ts";
import { db } from "./db.ts";
import { generateUpdateMiddleware } from "https://esm.sh/telegraf-middleware-console-time@2.1.0";

const bot = new Bot(BOT_TOKEN);

bot.use(generateUpdateMiddleware());

bot.command("start", async (ctx) => {
  if (ctx.chat?.type === "private") {
    const inlineButton = new InlineKeyboard().url(
      "Додати до групи",
      `https://t.me/${ctx.me.username}?startgroup=1`,
    );
    return ctx.reply(`Перепрошую, але я працюю тільки в групах`, {
      reply_markup: inlineButton,
    });
  }

  const group = await db`
    select "id"
    from "groups"
    where "chat_id"=${ctx.chat.id};
  `;

  if (group.length) {
    ctx.reply("Ви уже берете участь в їбанні русні 🔥");
  } else {
    ctx.reply("Щось пішло не так!");
  }
});

bot.command("help", (ctx) => {
  ctx.reply("Додайте цього бота до вашої групи та змагайтеся у розйобі русні");
});

bot.command("top", async (ctx) => {
  const result = await db<{ rank: number }[]>`
    with "ranked" as (
      select
        "chat_id",
        row_number()
          over (
            order by "count" desc
          )
          as "rank"
      from "groups"
    )
    select *
    from "ranked"
    where "chat_id"=${ctx.chat.id};
  `;

  const { rank } = result[0];

  ctx.reply(
    rank < 10 ? `Цей чат - #${rank} в топі` : `Цей чат - #${rank} в таблиці`,
    {
      reply_to_message_id: ctx.msg.message_id,
    },
  );
});

bot.on(":text", async (ctx) => {
  if (triggers(ctx.msg.text)) {
    const query = await db<{ count: number }[]>`
      update "groups"
      set "count"="count"+1
      where "chat_id"=${ctx.chat.id}
      returning "count"`;
    const { count } = query[0];

    if (isPrime(count)) {
      ctx.reply(
        `русня йобана ${count} ${pluralize(count, [
          "раз",
          "рази",
          "разів",
        ])} у цьому чаті`,
        {
          reply_to_message_id: ctx.msg.message_id,
        },
      );
    }
  }
});

bot.on("my_chat_member", async (ctx) => {
  if (
    ctx.myChatMember.new_chat_member.status === "member" ||
    ctx.myChatMember.new_chat_member.status === "administrator"
  ) {
    await db`
        insert into "groups"
          ("chat_id", "count")
        values
          (${ctx.chat.id}, 0)
        on conflict
        do nothing;`;
    ctx.reply("Вашу подорож розпочато! 🔥");
  } else {
    await db`
        delete from "groups"
        where "chat_id"=${ctx.chat.id}
    `;
  }
});

const handleUpdates = webhookCallback(bot, "oak");

export { bot, handleUpdates };
