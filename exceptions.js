
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
  
    exports.invalidMsg = invalidMsg;
    exports.invalidColor = invalidColor;
    exports.invalidCoord = invalidCoord;