import type { TelegrafCommandHandler } from '../types';
import { isChatGroup } from '../utils/isChatGroup';
import { isChatPrivate } from '../utils/isChatPrivate';

export const helpCommand: TelegrafCommandHandler = (ctx) => {
  if (isChatPrivate(ctx.message.chat)) {
    ctx.reply(
      'Розпочни подорож русофобією!\nДодай мене в групу та починай їбати русню'
    );
  }

  if (isChatGroup(ctx.message.chat)) {
    ctx.reply(
      'Розпочніть подорож русофобією!\nВідправте повідомлення з йобаною руснею'
    );
  }
};
