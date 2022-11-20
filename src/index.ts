import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { BOT_TOKEN } from './config/env.config';
import { jobanaruzzniaFileId } from './config/jobana-ruzznia-animation';
import { dbClient } from './db';
import { containsruzzniu } from './utils/contains-ruzzniy';
import * as chat from './models/chat.model';
import { pluralize } from './utils/pluralize';

const main = async () => {
  const bot = new Telegraf(BOT_TOKEN);

  bot.start((ctx) => {
    ctx.reply('Додай мене в групу і почніть їбати русню');
  });

  bot.help((ctx) => {
    // handle help command
    ctx.reply('Додай мене в групу і почніть їбати русню');
  });

  bot.on(message('text'), async (ctx) => {
    if (ctx.message.chat.type === 'private') {
      ctx.reply('Пробач, але я працюю тільки в групах 🥺');
      return;
    }

    const shouldIAnswer = containsruzzniu(ctx.message.text);

    if (shouldIAnswer) {
      const chatId = ctx.message.chat.id;
      const encounters = await chat.incrementCounter(chatId);
      const timesPluralized = pluralize(encounters, ['раз', 'рази', 'разів']);

      if (encounters === 1) {
        ctx.reply(
          `Вітаю! Ваша подорож русофобією розпочалася! ₚусня йобана ${encounters} ${timesPluralized}`
        );
        return;
      }

      if (Math.random() > 0.89) {
        ctx.sendAnimation(jobanaruzzniaFileId);
        return;
      }

      ctx.reply(`ₚусня йобана вже ${encounters} ${timesPluralized}`);
    }
  });

  bot.launch();

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await dbClient.$disconnect();
  });
