import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { BOT_TOKEN } from './config/env.config';
import { jobanaAnimationFileId } from './config/jobanaAnimation';
import { dbClient } from './db';
import { containsJobana } from './utils/containsJobana';
import { Chance } from './models/chance.model';
import * as chat from './models/chat.model';
import { pluralize } from './utils/pluralize';
import { isChatPrivate } from './utils/isChatPrivate';
import { isChatGroup } from './utils/isChatGroup';

const main = async () => {
  const bot = new Telegraf(BOT_TOKEN);
  const chance = new Chance();

  bot.start((ctx) => {
    if (isChatPrivate(ctx.message.chat))
      ctx.reply('Додай мене в групу і почніть їбати русню');

    if (isChatGroup(ctx.message.chat))
      ctx.reply(
        'Розпочніть подорож русофобією!\nВідправте повідомлення з йобаною руснею'
      );
  });

  bot.help((ctx) => {
    if (isChatPrivate(ctx.message.chat))
      ctx.reply(
        'Розпочни подорож русофобією!\nДодай мене в групу та починай їбати русню'
      );

    if (isChatGroup(ctx.message.chat))
      ctx.reply(
        'Розпочніть подорож русофобією!\nВідправте повідомлення з йобаною руснею'
      );
  });

  bot.on(message('text'), async (ctx) => {
    if (isChatPrivate(ctx.message.chat)) {
      ctx.reply('Пробач, але я працюю тільки в групах 🥺');
      return;
    }

    const shouldIAnswer = containsJobana(ctx.message.text);

    if (shouldIAnswer) {
      const chatId = ctx.message.chat.id;
      const encounters = await chat.incrementCounter(chatId);
      const timesPluralized = pluralize(encounters, ['раз', 'рази', 'разів']);

      if (encounters === 1) {
        ctx.reply(
          `Вітаю! Ваша подорож русофобією розпочалася!\nₚусня йобана ${encounters} ${timesPluralized}`
        );
        return;
      }

      if (chance.do()) {
        ctx.sendAnimation(jobanaAnimationFileId);
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
