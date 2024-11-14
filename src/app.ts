import { Markup, Telegraf } from "telegraf";
import 'dotenv/config';
import { addDataToTable, dataType, sendMessage } from "./mongodb";

const bot = new Telegraf(
  process.env.BOT_TOKEN as string
);

bot.start((ctx) => {
  ctx.reply("Hello " + ctx.from.first_name + "!\nWelcome to Prey Request Home If you have any prey request share with us we will prey for you!\nCheck out some prey request from other users @preyrequest");
});


bot.help((ctx) => {
  ctx.reply("Send /start to receive a greeting");
}); 

bot.on("text", async (ctx) => {
  const messageText = ctx.message.text;
  const hasLink = messageText.includes('http://') || messageText.includes('https://');
  if (!hasLink) {
    const prey: dataType = {
      message: messageText,
      approved: false
    };
    addDataToTable(prey);
    sendMessage(ctx.message.text);
    ctx.reply("Thanks for submiting your prey request wait to get your prey request published on our channel join us @preyrequest")
  }
});

bot.launch();