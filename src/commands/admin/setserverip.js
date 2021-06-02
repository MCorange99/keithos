const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { success } = require('../../utils/emojis.json');

module.exports = class SetPrefixCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setserverip',
      aliases: ['setsip', 'ssip'],
      usage: 'setserverip <IP>',
      description: 'Sets the `IP` for your server.',
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD'],
      examples: ['setserverip test.net']
    });
  }
  run(message, args) {
    const oldServerIp = message.client.db.settings.selectServerIp.pluck().get(message.guild.id);
    const serverIp = args[0];
    
    if (!serverIp) return this.sendErrorMessage(message, 0, 'Please provide an IP');
    // else if (prefix.length > 3) 
    //   return this.sendErrorMessage(message, 0, 'Please ensure the prefix is no larger than 3 characters');
    message.client.db.settings.updateServerIp.run(serverIp, message.guild.id);
    const embed = new MessageEmbed()
      .setTitle('Settings: `System`')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(`The \`IP\` was successfully updated. ${success}`)
      .addField('IP', `\`${oldServerIp}\` ➔ \`${serverIp}\``)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
