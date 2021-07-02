const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class PrefixCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ip',
      usage: 'ip',
      description: 'Fetches The current servers IP.',
      type: client.types.INFO
    });
  }
  run(message) {
    const serverIp = message.client.db.settings.selectServerIp.pluck().get(message.guild.id) || '`None`'; // Get prefix
    const embed = new MessageEmbed()
      .setTitle('Servers IP')
      .addField('IP', `\`${serverIp}\``, true)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};