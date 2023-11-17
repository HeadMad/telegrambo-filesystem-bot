import telegrambo from "telegrambo";
import extensionName from "./index.js";

const bot = telegrambo(process.env.BOT_TOKEN);
bot.extensionName = extensionName;

bot.extensionName('First Argument', {
  secondArgument: 'Second Argument'
});

(async () => {
  const {ok, result} = await bot.getUpdates();

  if (ok) 
    for (const update of result) {
      bot.setUpdate(update);
    }

})();

