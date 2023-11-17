import bot from '../bot.js';
export default sendChatAction;

function sendChatAction(chatId, type) {
  return bot.sendChatAction({
    chat_id: chatId,
    action: 'upload_' + type
  });
}