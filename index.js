
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

const letterdict = {
  A: [21, 40], // dict.A[0] = 21, dict.A[1] = 40
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
  Q: [341, 400],
  R: [401, 420],
  S: [421, 440],
  T: [441, 460],
  U: [461, 480],
  V: [481, 500],
  W: [501, 520],
  X: [521, 540],
  };

const numdict = {
  1: [21, 40], // dict[1][0] = 21, dict[1]][1] = 40
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
  17: [321, 340],
  18: [341, 400],
  19: [401, 420],
  20: [421, 440],
  21: [441, 460],
  22: [461, 480],
  23: [481, 500],
  24: [501, 520],
  25: [521, 540],
  26: [541, 560],
  27: [561, 580],
  28: [581, 600],
  29: [601, 620],
  30: [621, 640],
  };

console.log(letterdict.A[0]); // letterdict test  
console.log(numdict[1][0]); // numdict test

Jimp.read('resources/templateNew.png', (err, template) => {
  if (err) throw err;
  for (var x = 21 ; x <= 620 ; x ++){
    for (var y = 21 ; y <= 500 ; y ++){
      if (x % 20 != 0 && y %20 != 0){
      template.setPixelColor(Jimp.cssColorToHex('orange'), x, y);
      }
    }
  }
  template.write('./resources/templateNew.png'); 
});