import type { Chat as TelegrafChat } from 'telegraf/typings/core/types/typegram';

export const isChatPrivate = (chat: TelegrafChat) => chat.type === 'private';
