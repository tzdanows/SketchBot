require('dotenv').config();
const Discord = require('discord.js');
var Jimp = require('jimp');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const data = require('./data');

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content.startsWith('!sketch')) {
    var args = (msg.content.trim().split(/ +/g)).slice(0);
    args.shift();
    if (args[0].toUpperCase() == "CLEAR"){
      clear(msg);
    }
    else{
      draw(args[0], args[1], msg);  
    }
  } 
});

function draw(index, color, msg){
  const number = index.substring(1);
  const letter = index[0].toUpperCase();
  Jimp.read('resources/template.png', (err, template) => {
  if (err) throw err;
  for (var x = data.numDict[number][0] ; x < data.numDict[number][1] ; x++){
    for (var y = data.letterDict[letter][0] ; y < data.letterDict[letter][1] ; y++){
      template.setPixelColor(Jimp.cssColorToHex(color), x, y);
      }
    }
    template.writeAsync('./resources/template.png', sendMessage(msg));
  });
}

function clear (msg){
  Jimp.read('resources/template.png', (err, template) => {
    if (err) throw err;
    for (var x = 21 ; x <= 620 ; x ++){
      for (var y = 21 ; y <= 500 ; y ++){
        if (x % 20 != 0 && y %20 != 0){
        template.setPixelColor(Jimp.cssColorToHex('white'), x, y);
        }
      }
    }
    template.writeAsync('./resources/template.png', sendMessage(msg)); 
  }); 
}

function sendMessage(msg){
  msg.channel.send({
    files:[
      "resources/template.png"
    ]
  }); 
}

