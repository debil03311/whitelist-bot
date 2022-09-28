const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const ANY_SERVER = true;

const SERVER_IDS = [
  '',
]

const ALL_WORDS = false;

const WORD_WHITELIST = [
  '',
]

const whitelistRegex = new RegExp(WORD_WHITELIST.join('|'));

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

  const lowercaseContent = message.content.toLowerCase()

  if (!ALL_WORDS && !lowercaseContent.match(whitelistRegex))
    return message.delete();

  for (const word of WORD_WHITELIST) {
    if (!lowercaseContent.match(word))
      return message.delete();
  }
});

client.login('');