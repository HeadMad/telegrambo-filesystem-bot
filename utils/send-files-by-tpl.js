import path from "path";
import fs from "fs";
import bot from '../bot.js';
import getFileType from './get-file-type.js';

export default sendFilesByTpl;

async function sendFilesByTpl({chatId, currentPath, text, currentDirFiles}) {
  let reString = text
    .replace(/\.|\^|\$|\+|\-|\?|\(|\)|\[|\]|\{|\}|\\|\|/g, '\\$&')
    .replace('*', '.*');

  const RE = new RegExp(reString);

  const fileTypes = new Map();

  for (let file of currentDirFiles) {
    const filePath = path.join(currentPath, file);

    if (!fs.statSync(filePath).isFile())
      continue;

    if (!RE.test(file))
      continue;

    const type = getFileType(filePath);

    const inputMedia = {
      type: type,
      media: filePath
    };

    if (!fileTypes.has(type))
      fileTypes.set(type, [inputMedia]);

    else
      fileTypes.get(type).push(inputMedia);
  }

  if (!fileTypes.size === 0)
    return;

  for (let [type, items] of fileTypes) {
    for (let i = 0; i < items.length; i += 10) {
      
      const timer = setInterval(() => {
        bot.sendChatAction({
          chat_id: chatId,
          action: 'upload_' + type
        });
      }, 4000);
      
      const media = items.slice(i, i + 10);
      await bot.sendFile({
        chat_id: chatId,
        media: media
      }).then(() => {
        clearInterval(timer);

      }).catch(err => {
        clearInterval(timer);
        bot.sendMessage({
          chat_id: chatId,
          text: 'Upload Error: ' + err.message
        })
      });
    }
  }

}