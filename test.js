import bot from './bot.js';


const timer = setInterval(() => {
  bot.sendChatAction({
    chat_id: process.env.CHAT_ID,
    action: 'typing'
  });
}, 4000);

setTimeout(() => {
  clearInterval(timer);
}, 20000);

