require('dotenv').config();
const Discord = require('discord.js');
var Jimp = require('jimp');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const DATABASE = process.env.DATABASE;
const data = require('./data');
const exceptions = require('./exceptions');
var admin = require("firebase-admin");
var serviceAccount = require("./serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DATABASE
});

const db = admin.firestore();

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
      else if(args[0].toUpperCase() == "HELP"){
        help(msg);
      }
      else if(args[0].toUpperCase() == "LEGEND"){
        legend(10,msg);
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

  getImageName(msg).then(name => {
    if (name == false){
      init(index, color, msg, name);
      return;
    }
    else{ 
      Jimp.read('resources/' + name, (err, template) => {
        if (err) throw err;
        if (Jimp.cssColorToHex(color) == 255 && color != "black" && color != "#000000"){
          exceptions.invalidColor(msg);
          return;
        }
        for (var x = data.numDict[number][0] ; x < data.numDict[number][1] ; x++){
          for (var y = data.letterDict[letter][0] ; y < data.letterDict[letter][1] ; y++){
            template.setPixelColor(Jimp.cssColorToHex(color), x, y);
            }
          }
          template.writeAsync('./resources/' + name, sendMessage(msg, name));
          writeDb(msg);
        });
    }
  }
  );
}

function clear (msg){
  getImageName(msg).then(name => {
    if (name == false){
      msg.reply("Please sketch a bit before clearing!");
      return;
    }

    else{ 
      Jimp.read('resources/' + name, (err, template) => {
        if (err) throw err;
        for (var x = 21 ; x <= 620 ; x ++){
          for (var y = 21 ; y <= 500 ; y ++){
            if (x % 20 != 0 && y %20 != 0){
            template.setPixelColor(Jimp.cssColorToHex('white'), x, y);
            }
          }
        }
        template.writeAsync('./resources/' + name, sendMessage(msg, name)); 
        writeDb(msg);
        
      });
      
    }
  })
 
}

function help(msg){
    msg.channel.send({embed: {
      color: 24248, //14942251,
      title: "Documentation Link",
      author: {
        name: "Command usage help for sketch!", //bot.user.username,
        icon_url: bot.user.avatarURL
      },
      url: "https://github.com/Tommot4747/DemonHacks2020/tree/master",
      description: "For any additional help with this, please contact PRIME#0001, Karmajuney#9999, Uncultured#8320 or open a ticket on GitHub.",
      fields: [{
          name: "**sketch**",
          value: "> Lets you sketch a plot on the canvas! \n `!sketch A1` `!sketch G15` `!sketch W30` "
        },
        {
          name: "**clear**",
          value: "> Clears the canvas! \n `!sketch clear`"
        },
        {
          name: "**legend**",
          value: "> Gives a fun fact about the developers! \n `!sketch legend`"
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: msg.author.avatarURL,
        text: "Team ATA - Demonhacks 2020"
      }
    }
  });
  }

function legend(inter,msg){
  num = getRandomInt(inter);
  msg.reply(data.legendDict[num][0]);
}


function init(index, color, msg, name){
  Jimp.read('resources/default.png', (err, template) => {
    if (err) throw err;
    const name = msg.guild.id + ".png";
    template.writeAsync('./resources/' + name, draw(index, color, msg)); 
    writeDb(msg);
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sendMessage(msg, name){
  msg.channel.send({
    files:[
      "resources/" + name
    ]
  }); 
}

async function getImageName(msg){
 
    const info = db.collection('serverData').doc(msg.guild.id)
    const doc = await info.get();
    if (!doc.exists){ 
      return false;
    }
    else{
      return(doc._fieldsProto.imageHash.stringValue + ".png");

  }

}

function writeDb(msg){

  const hashData = {
    imageHash: msg.guild.id
  };


  db.collection('serverData').doc(msg.guild.id).set(hashData);

}

function checkArgs(args, msg){
  if(args.length < 1 || args.length > 2){
    exceptions.invalidMsg(msg)
    return false;
  }
  if (args[0].toUpperCase() == "CLEAR" && args.length == 1){
    return true;
  }
  if (args[0].toUpperCase() == "HELP" && args.length == 1){
    return true;
  }
  if (args[0].toUpperCase() == "LEGEND" && args.length == 1){
    return true;
  }

  try{
    number = args[0].substring(1);
    letter = args[0][0].toUpperCase();
    if(number in data.numDict && letter in data.letterDict && args.length == 2){
        return true;
    }
    else{
      exceptions.invalidCoord(msg)
      return false;
    }
  }
  catch{
    exceptions.invalidMsg(msg)
    return false;
  }
}





