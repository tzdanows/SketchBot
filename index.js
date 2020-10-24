
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
  for (var x = numDict[number][0] ; x < numDict[number][1] ; x++){
    for (var y = letterDict[letter][0] ; y < letterDict[letter][1] ; y++){
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

const letterDict = {
  A: [21, 40], 
  B: [41, 60],
  C: [61, 80],
  D: [81, 100],
  E: [101, 120],
  F: [121, 140],
  G: [141, 160],
  H: [161, 180],
  I: [181, 200],
  J: [201, 220],
  K: [221, 240],
  L: [241, 260],
  M: [261, 280],
  N: [281, 300],
  O: [301, 320],
  P: [321, 340],
  Q: [341, 360],
  R: [361, 380],
  S: [381, 400],
  T: [401, 420],
  U: [421, 440],
  V: [441, 460],
  W: [461, 480],
  X: [481, 500],
};


const numDict = {
  1: [21, 40],
  2: [41, 60],
  3: [61, 80],
  4: [81, 100],
  5: [101, 120],
  6: [121, 140],
  7: [141, 160],
  8: [161, 180],
  9: [181, 200],
  10: [201, 220],
  11: [221, 240],
  12: [241, 260],
  13: [261, 280],
  14: [281, 300],
  15: [301, 320],
  16: [321, 340],
  17: [341, 360],
  18: [361, 380],
  19: [381, 400],
  20: [401, 420],
  21: [421, 440],
  22: [441, 460],
  23: [461, 480],
  24: [481, 500],
  25: [501, 520],
  26: [521, 540],
  27: [541, 560],
  28: [561, 580],
  29: [581, 600],
  30: [601, 620],
  };
