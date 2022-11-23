import { getChatLeaderboardPosition } from '../models/chat.model';
import type { TelegrafCommandHandler } from '../types';
import { isChatGroup } from '../utils/isChatGroup';
import { isChatPrivate } from '../utils/isChatPrivate';

export const topCommand: TelegrafCommandHandler = async (ctx) => {
  if (isChatPrivate(ctx.message.chat)) {
    ctx.reply('Ця команда працює тільки в групі 😉');
  }

  if (isChatGroup(ctx.message.chat)) {
    const chatPosition = await getChatLeaderboardPosition(ctx.message.chat.id);
    if (chatPosition)
      ctx.reply(`Ви найкращі ☺️\nВаша позиція в рейтингу: ${chatPosition}`);
    else ctx.reply(`Отакої! Здається ви ще не берете участь в їбанні русні...`);
  }
};
