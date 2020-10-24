require('dotenv').config();
const Discord = require('discord.js');
var Jimp = require('jimp');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong', {
      files:[
        "resources/template.png"
      ]
    });

  } else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
});

Jimp.read('resources/template.png', (err, template) => {
  if (err) throw err;
  for (var x = 21 ; x <= 620 ; x ++){
    for (var y = 21 ; y <= 500 ; y ++){
      if (x % 20 != 0 && y %20 != 0){
      template.setPixelColor(Jimp.cssColorToHex('#ff800e'), x, y);
      }
    }
  }
  template.write('./resources/templateNew.png'); 
});