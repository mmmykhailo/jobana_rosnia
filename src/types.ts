import type { Context, Middleware, NarrowedContext } from 'telegraf';
import type { MountMap } from 'telegraf/typings/telegram-types';

export type TelegrafCommandHandler<T = {}> = Middleware<
  NarrowedContext<Context, MountMap['text']> & T
>;

export type TelegrafStartCommandHandler = TelegrafCommandHandler<{
  startPayload: string;
}>;
