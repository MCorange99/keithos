const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

//can replace MyCommandName with your command name 
module.exports = class MyCommandName extends Command {
  constructor(client) {
    super(client, {
      name: 'vote', //command name
      usage: 'vote', //usage for the command, example: ping (prepends prefix in the help command btw)
      description: 'Gives you the vote links', //description for it
      type: client.types.INFO //can be any available types, look in this.types in client.js file
    });
  }
  async run(message, args) {
    const embed = new MessageEmbed()
    .setTitle('Vote For Keithos')
    .setThumbnail('https://raw.githubusercontent.com/MCorange99/keithos/blob/main/data/images/Calypso.png')
    .addField('Discord.boats','[Link](https://discord.boats/bot/837371090783174696)')
    .addField('Discordbotlist.com','[Link](https://discordbotlist.com/bots/keithos)')
    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
  message.channel.send(embed);
 
  }
}