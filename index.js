const { Telegraf } = require("telegraf");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const jobanaExp =
  /йобан([а-яієї]{1,2}).*(р|ₚ|\.)(у|о)сн([а-яієї]{1,2})|(р|ₚ|\.)(у|о)сн([а-яієї]{1,2}).*йобан([а-яієї]{1,2})/;

const chooseAfterNumWord = (value, words) => {
  value = Math.abs(value) % 100;
  var num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
};

async function main() {
  const bot = new Telegraf(process.env.BOT_TOKEN);
  bot.start((ctx) => ctx.reply("Йобана русня"));

  bot.on("text", async (ctx) => {
    if (
      ctx.message &&
      ctx.message.chat &&
      ctx.message.text.toLocaleLowerCase().match(jobanaExp)
    ) {
      const chat = await prisma.chat.upsert({
        where: {
          id: ctx.message.chat.id,
        },
        update: {
          counter: {
            increment: 1,
          },
        },
        create: {
          id: ctx.message.chat.id,
          counter: 1,
        },
      });

      if (chat) {
        ctx.reply(
          `ₚусня йобана вже ${chat.counter} ${chooseAfterNumWord(chat.counter, [
            "раз",
            "рази",
            "разів",
          ])}`
        );
      }
    }
  });
  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
