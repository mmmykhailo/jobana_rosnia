import { dbClient } from '../db';

export const incrementCounter = async (chatId: number) => {
  const chat = await dbClient.chat.upsert({
    where: {
      chatId,
    },
    create: {
      chatId,
      encounters: 1,
    },
    update: {
      encounters: {
        increment: 1,
      },
    },
  });

  return chat.encounters;
};
