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
    if(checkArgs(args, msg)){
      if (args[0].toUpperCase() == "CLEAR"){
        clear(msg);
      }
      else{
        draw(args[0], args[1], msg); 
      } 
    }
  } 
});

function draw(index, color, msg){
  const number = index.substring(1);
  const letter = index[0].toUpperCase();
  Jimp.read('resources/template.png', (err, template) => {
  if (err) throw err;
  if (Jimp.cssColorToHex(color) == 255 && color != "black" && color != "#000000"){
    invalidColor(msg);
    return;
  }
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

function checkArgs(args, msg){
  if(args.length < 1 || args.length > 2){
    invalidMsg(msg)
    return false;
  }
  if (args[0].toUpperCase() == "CLEAR" && args.length == 1){
    return true;
  }

  try{
    number = args[0].substring(1);
    letter = args[0][0].toUpperCase();
    if(number in data.numDict && letter in data.letterDict && args.length == 2){
        return true;
    }
    else{
      invalidCoord(msg)
      return false;
    }
  }
  catch{
    invalidMsg(msg)
    return false;
  }
}

function invalidMsg(msg){
  msg.reply('Your input was formatted incorrectly, please try to format it as such: **!sketch {coordinate} {color}** or **!sketch clear**.');
  msg.channel.send('Type **!sketch help** for more info!');
}

function invalidColor(msg){
  msg.reply('The color provided does not follow the proper format. Please try to format it as such: **blue** or **#0000FF**.');
}

function invalidCoord(msg){
  msg.reply('The coordinates provided does not follow the proper format. Please try to format it as such: **A10**');
}

