// at the top of your file
const Discord = require('discord.js');

// inside a command, event listener, etc.
const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#E4002B')
	.setTitle('Command usage help for sketch!')
	.setURL('https://discord.js.org/')
	.setAuthor('Team Alex', 'https://i.imgur.com/dnzhcTC.png', 'https://discord.js.org')
	.setDescription('For any additional help with this, please contact PRIME#0001, Karmajuney#9999, or Uncultured#8320')
	.setThumbnail('https://i.imgur.com/dnzhcTC.png')
	.addFields(
		{ name: 'sketch(row,column) - Lets you sketch a plot on the canvas!', value: '`Example Usage:` `!sketch C10` to plot a point at the third row and 10th column.' },
		{ //name: '\u200B', value: '\u200B' },
		{ name: 'clear() - Clears the canvas', value: '`Example usage:` !clear', inline: true },
		{ name: 'legend() - Gives a fun fact about Alex Mikhail', value: '`Example usage:` !legend', inline: true },
	)
	//.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/dnzhcTC.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/dnzhcTC.png');

channel.send(exampleEmbed);