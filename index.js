import bot from './bot.js';
import fs from 'fs';
import sendFilesByTpl from './utils/send-files-by-tpl.js';
import getFileType from './utils/get-file-type.js';
import getList from './utils/get-list.js';

import path from 'path';



let currentPath = '.';
let currentDirFiles = fs.readdirSync(currentPath);

// Special charackters: \/?:*<>"|
bot.on('message', async (event) => {
  // close if not from the admin
  if (event.message.chat.id != process.env.CHAT_ID)
    return;


  const text = event.message.text;


  if (text === '/ls') {
    const list = getList(currentPath, currentDirFiles)
    return event.sendMessage({
      text: list,
      parse_mode: 'HTML'
    });
  }


  if (text.includes('*'))
    return sendFilesByTpl({
      chatId: event.message.chat.id,
      currentPath,
      text,
      currentDirFiles
    });

  try {

    let name;
    name = currentDirFiles.find(file => file.toLowerCase() === text.toLowerCase());

    if (!name
      && text === '.'
      || text === '..'
      || text.startsWith('./')
      || text.startsWith('../')
      || text.startsWith('/')
    ) name = text;


    const filePath = path.join(currentPath, name);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      currentPath = filePath;
      currentDirFiles = fs.readdirSync(filePath);
      return event.sendMessage({
        text: getList(currentPath, currentDirFiles),
        parse_mode: 'HTML'
      });
    }

    if (stat.isFile()) {
      const type = getFileType(filePath);
      return bot.sendFile({
        chat_id: event.message.chat.id,
        [type]: filePath
      });
    }

    return event.sendMessage({
      text: 'File not found'
    });

  } catch (err) {

    event.sendMessage({
      text: `Error: ${err.message}`
    });
  }
});

bot.polling();
