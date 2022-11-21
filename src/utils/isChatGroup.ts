import type { Chat as TelegrafChat } from 'telegraf/typings/core/types/typegram';

export const isChatGroup = (chat: TelegrafChat) =>
  chat.type === 'group' || chat.type === 'supergroup';
