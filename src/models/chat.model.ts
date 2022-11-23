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

export const getChatLeaderboardPosition = async (chatId: number) => {
  const result: {
    rowNumber: number;
  }[] = await dbClient.$queryRaw`select "rowNumber" from (select row_number() over(order by encounters desc) "rowNumber", * from "Chat") where "chatId"=${chatId}`;

  return Number(result[0]?.rowNumber);
};
