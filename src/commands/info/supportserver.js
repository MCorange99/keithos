const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class SupportServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'supportserver',
      aliases: ['support', 'ss'],
      usage: 'supportserver',
      description: 'Displays the invite link to Keithos Discord Support Server.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle('Support Server')
      .setThumbnail('https://raw.githubusercontent.com/MCorange99/keithos/blob/main/data/images/Calypso.png')
      .setDescription('Click [here](https://discord.gg/M7nDZxKk24) to join the Keithos Support Server!')
      .addField('Other Links', 
        '**[Invite Me](https://discord.com/api/oauth2/authorize?client_id=837371090783174696&permissions=0&redirect_uri=https%3A%2F%2Fdiscord.events.stdlib.com%2Fdiscord%2Fauth%2F&scope=bot) | ' +
        '[Repository](https://github.com/MCorange99/keithos)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
