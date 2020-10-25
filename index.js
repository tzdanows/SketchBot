require('dotenv').config();
const Discord = require('discord.js');
var Jimp = require('jimp');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const DATABASE = process.env.DATABASE;
const data = require('./data');
const exceptions = require('./exceptions');
const fs = require('fs');
var admin = require("firebase-admin");
var serviceAccount = require("./serviceKey.json");

//Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DATABASE
});

const db = admin.firestore();

//Initialize Discord Bot
bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setStatus('available')
  bot.user.setPresence({
    game: {
      name: '!sketch help',
      type: "Streaming🎨",
      url: "https://www.twitch.tv/bobross"
    }
  });
});

bot.on('message', msg => {
  if (msg.content.startsWith('!sketch')) {
<<<<<<< HEAD
      var args = (msg.content.trim().split(/ +/g)).slice(0);
      args.shift();
      if (checkArgs(args, msg)) {
          if (args.length == 0){
              showSketch(msg);
          } else if (args[0].toUpperCase() == "CLEAR") {
              clear(msg);
          } else if (args[0].toUpperCase() == "HELP") {
              help(msg);
          } else if (args[0].toUpperCase() == "LEGEND") {
              legend(10, msg);
          } else if (args[0].toUpperCase() == "FILLCANVAS") {
              fillCanvas(msg);
          } else if (args[0].toUpperCase() == "IMAGE") {
            var url;
            msg.attachments.forEach(attachment => {
                url = attachment.url;
              });
              if (args.length == 1) args.push(url);
              Jimp.read(args[1]).then(image => {
                      image.resize(30, 24);
                      image.write('temp.jpg', processImage(image, msg));
                  })
                  .catch(err => {
                      msg.reply("The FILE/URL provided does not contain a valid image!");
                  });
          } else {
              draw(args[0], args[1], msg);
          }
=======
    var args = (msg.content.trim().split(/ +/g)).slice(0);
    args.shift();
    if (checkArgs(args, msg)) {
      if (args.length == 0) {
        showSketch(msg);
      } else if (args[0].toUpperCase() == "CLEAR") {
        clear(msg);
      } else if (args[0].toUpperCase() == "HELP") {
        help(msg);
      } else if (args[0].toUpperCase() == "LEGEND") {
        legend(10, msg);
      } else if (args[0].toUpperCase() == "FILLCANVAS") {
        fillCanvas(msg);
      } else if (args[0].toUpperCase() == "IMAGE") {
        var url;
        msg.attachments.forEach(attachment => {
          url = attachment.url;
        });
        if (args.length == 1) args.push(url);
        Jimp.read(args[1]).then(image => {
            image.resize(30, 24);
            image.write('temp.jpg', processImage(image, msg));
          })
          .catch(err => {
            msg.reply("The FILE/URL provided does not contain a valid image!");
          });
      } else {
        draw(args[0], args[1], msg);
>>>>>>> 93c43ea4c949bdd1cf20d87cccf193b6e036b9a6
      }
    }
  }
});

// SEND CURRENT TEMPLATE
function sendMessage(msg, name) {
  msg.channel.send({
    files: [
      "resources/" + name
    ]
  });
}

// MAIN COMMAND
function draw(index, color, msg) {
  const number = index.substring(1);
  const letter = index[0].toUpperCase();

  getImageName(msg).then(name => {
    if (name == false) {
      init(index, color, msg);
      return;
    } else {
      Jimp.read('resources/' + name, (err, template) => {
        if (err) throw err;
        if (color.toUpperCase() == "RANDOM") {
          color = randomColor();
        } else if (Jimp.cssColorToHex(color) == 255 && color != "black" && color != "#000000") {
          exceptions.invalidColor(msg);
          return;
        }
        for (var x = data.numDict[number][0]; x < data.numDict[number][1]; x++) {
          for (var y = data.letterDict[letter][0]; y < data.letterDict[letter][1]; y++) {
            template.setPixelColor(Jimp.cssColorToHex(color), x, y);
          }
        }
        template.writeAsync('./resources/' + name, sendMessage(msg, name));
      });
    }
  });
}

function clear(msg) {
  getImageName(msg).then(name => {
    if (name == false) {
      msg.reply("Please sketch a bit before clearing!");
      return;
    } else {
      Jimp.read('resources/' + name, (err, template) => {
        if (err) throw err;
        for (var x = 21; x <= 620; x++) {
          for (var y = 21; y <= 500; y++) {
            if (x % 20 != 0 && y % 20 != 0) {
              template.setPixelColor(Jimp.cssColorToHex('white'), x, y);
            }
          }
        }
        template.writeAsync('./resources/' + name, sendMessage(msg, name));

      });

    }
  });
}

function help(msg) {
    msg.channel.send({
        embed: {
            color: 24248, //14942251,
            title: "Documentation Link",
            author: {
                name: "Command usage help for sketch!", //bot.user.username,
                icon_url: bot.user.avatarURL
            },
            url: "https://github.com/Tommot4747/DemonHacks2020/tree/master",
            description: "For any additional help with this, please contact PRIME#0001, Karmajuney#9999, Uncultured#8320 or open a ticket on GitHub.",
            fields: [
                {
                    name: "**sketch**",
                    value: "> Shows the current canvas. \n `!sketch` "
                },
                {
                    name: "**sketch [row][col] {color}**",
                    value: "> Sets a given cell in the canvas to a color, hex, or random value you provide. \n `!sketch A1 Red` `!sketch G15 0F0F0F` `!sketch W30 Random` "
                },
                  {
                    name: "**image [url]**",
                    value: "> Resizes a given image via URL to the canvas size and shifts each canvas cell to the most applicable color. \n `!sketch {url}` `!sketch https://i.imgur.com/...` "
                  },
                  {
                    name: "**image [upload]**",
                    value: "> Resizes a given image via discord upload to the canvas size and shifts each canvas cell to the most applicable color. \n !sketch {upload a file here} "
                },
                  {
                    name: "**fillcanvas []**",
                    value: "> Fills each cell of the canvas with a random hex color. \n `!sketch fillcanvas` "
                },
                {
                    name: "**clear []**",
                    value: "> Clears the canvas! \n `!sketch clear`"
                },
                {
                    name: "**legend []**",
                    value: "> Gives a fun fact about the developers! \n `!sketch legend`"
                },
              ],
            timestamp: new Date(),
            footer: {
                icon_url: msg.author.avatarURL,
                text: "Team ATA - Demonhacks 2020"
            }
        }
    }
  );
}

function processImage(image, msg) {

  getImageName(msg).then(name => {
    if (name == false) {
      msg.reply("Please draw BEFORE replacing an image");
      return;
    } else {
      Jimp.read('resources/' + name, (err, template) => {
        if (err) throw err;
        var xblockcounter = 1;
        var yblockcounter = 1;
        var blocksize = 1;
        for (var x = 21; x <= 620; x++) {
          for (var y = 21; y <= 500; y++) {
            if (x % 20 != 0 && y % 20 != 0) {
              var color = image.getPixelColor(xblockcounter, yblockcounter);
              template.setPixelColor(color, x, y);
            } else {
              yblockcounter++;
              if (blocksize > 20) {
                xblockcounter++;
                blocksize = 1;
              }
            }
          }
          yblockcounter = 1;
          blocksize++;
        }
        template.writeAsync('./resources/' + name, sendMessage(msg, name));
      });
      if (fs.existsSync('./temp.jpg')) {
        fs.unlink('./temp.jpg', (err => {
          if (err)
            console.log(err);
        }));
      }
    }
  });

}

function legend(inter, msg) {
  num = getRandomInt(inter);
  msg.reply(data.legendDict[num][0]);
}

// ARGUMENT CHECKING
function checkArgs(args, msg) {
  if (args.length > 2) {
    exceptions.invalidMsg(msg)
    return false;
  }

  if (args.length == 0) {
    return true;
  }
  if (args[0].toUpperCase() == "CLEAR" && args.length == 1) {
    return true;
  }
  if (args[0].toUpperCase() == "FILLCANVAS" && args.length == 1) {
    return true;
  }
  if (args[0].toUpperCase() == "HELP" && args.length == 1) {
    return true;
  }
  if (args[0].toUpperCase() == "LEGEND" && args.length == 1) {
    return true;
  }

  if (args[0].toUpperCase() == "IMAGE" && args.length <= 2) {
    return true;
  }

  try {
    number = args[0].substring(1);
    letter = args[0][0].toUpperCase();
    if (number in data.numDict && letter in data.letterDict && args.length == 2) {
      return true;
    } else {
      exceptions.invalidCoord(msg)
      return false;
    }
  } catch {

    exceptions.invalidMsg(msg)
    return false;
  }
}

// Helper methods
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function fillCanvas(msg) {
  getImageName(msg).then(name => {
    if (name == true) {
      msg.reply("Can only when the canvas is empty! Try !sketch clear()");
      return;
    } else {
      Jimp.read('resources/' + name, (err, template) => {
        if (err) throw err;
        var xblockcounter = 1;
        var yblockcounter = 1;
        var blocksize = 1;
        var cells = Array(24);
        var color = randomColor();
        color[1] = randomColor();
        for (var x = 21; x <= 620; x++) {
          for (var y = 21; y <= 500; y++) {
            if (x % 20 != 0 && y % 20 != 0) {
              template.setPixelColor(Jimp.cssColorToHex(cells[yblockcounter]), x, y);

            } else {
              cells[yblockcounter] = color;
              yblockcounter++;
              color = randomColor();
              if (blocksize > 20) {
                xblockcounter++;
                cells = Array(24);
                color[1] = randomColor();
                blocksize = 1;
              }
            }
          }
          yblockcounter = 1;
          blocksize++;
          color = randomColor();
        }
        template.writeAsync('./resources/' + name, sendMessage(msg, name));
      });
    }
  })
}

function randomColor() {
  var randColor = Math.floor(Math.random() * 16777215).toString(16);
  return randColor;
}

function showSketch(msg) {
  getImageName(msg).then(name => {
    if (name == false) {
      msg.reply("Please sketch a bit first! Run **!sketch help** for help.");
      return;
    } else {
      sendMessage(msg, name);
    }
  });
}

// CLOUD FIREBASE METHODS
function init(index, color, msg) {
  Jimp.read('resources/default.png', (err, template) => {
    if (err) throw err;
    const name = msg.guild.id + ".png";
    template.writeAsync('./resources/' + name, draw(index, color, msg));
    writeDb(msg);
  });
}

function writeDb(msg) {
  const hashData = {
    imageHash: msg.guild.id
  };
  db.collection('serverData').doc(msg.guild.id).set(hashData);
}

async function getImageName(msg) {

  const info = db.collection('serverData').doc(msg.guild.id)
  const doc = await info.get();
  if (!doc.exists) {
    return false;
  } else {
    return (doc._fieldsProto.imageHash.stringValue + ".png");
  }
}