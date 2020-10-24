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
  if (msg.content.startsWith('!sketch')) {
    var args = (msg.content.trim().split(/ +/g)).slice(0);
    args.shift();
    console.log(args);
    msg.channel.send('Heres the current sketch:', {
      files:[
        "resources/templateNew.png"
      ]
    });
  } 
});

Jimp.read('resources/templateNew.png', (err, template) => {
  if (err) throw err;
  for (var x = 21 ; x <= 620 ; x ++){
    for (var y = 21 ; y <= 500 ; y ++){
      if (x % 20 != 0 && y %20 != 0){
      template.setPixelColor(Jimp.cssColorToHex('blue'), x, y);
      }
    }
  }
  template.write('./resources/templateNew.png'); 
});