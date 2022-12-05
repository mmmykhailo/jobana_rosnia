import { chatExists } from '../models/chat.model';
import type { TelegrafStartCommandHandler } from '../types';
import { isChatGroup } from '../utils/isChatGroup';
import { isChatPrivate } from '../utils/isChatPrivate';

export const startCommand: TelegrafStartCommandHandler = async (ctx) => {
  if (isChatPrivate(ctx.message.chat)) {
    ctx.reply(
      'Розпочни подорож русофобією!\nДодай мене в групу та починай їбати русню'
    );
  }

  if (isChatGroup(ctx.message.chat)) {
    if (await chatExists(ctx.message.chat.id)) {
      ctx.reply(
        'Відправляйте повідомлення з йобаною руснею та змагайтеся з іншими чатами у вашій русофобії!',
        { reply_to_message_id: ctx.message.message_id }
      );
    } else {
      ctx.reply(
        'Розпочніть подорож русофобією!\nВідправте повідомлення з йобаною руснею та почніть змагатися з іншими чатами у русофобії',
        { reply_to_message_id: ctx.message.message_id }
      );
    }
  }
};
