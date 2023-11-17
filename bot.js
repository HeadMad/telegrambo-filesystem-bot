import telegrambo from 'telegrambo';
import polling from 'telegrambo-polling';
import sendFile from 'telegrambo-send-file';

const bot = telegrambo(process.env.BOT_TOKEN);
bot.sendFile = sendFile(process.env.BOT_TOKEN);
bot.polling = polling;

// bot.setMyCommands({
//   commands: [
//     {
//       command: 'ls',
//       description: 'List of files'
//     },
//     {
//       command: 'mkdir',
//       description: 'Create new folder',
//     },
//     {
//       command: 'rmdir',
//       description: 'Remove folder',
//     },
//     {
//       command: 'rm',
//       description: 'Remove file',
//     }
//   ]
// }).then(console.log)

export default bot;