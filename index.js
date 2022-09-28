const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const ANY_SERVER = true;

const SERVER_IDS = [
  '',
]

const WORD_WHITELIST = [
  '',
]

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.once('ready', (client)=> {
  console.log(`[${new Date().toLocaleTimeString()}] Bot is online`);

  client.user.setActivity({
    type: ActivityType.Playing,
    name: '🤍',
  });
});

client.on('messageCreate', (message)=> {
  if (message.author.bot)
    return;

  if (!ANY_SERVER && !SERVER_IDS.includes(message.guildId))
    return;

  for (const word of WORD_WHITELIST) {
    if (!message.content.toLowerCase().match(word))
      message.delete();
  }
});

client.login('');