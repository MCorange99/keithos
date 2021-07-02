const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { success } = require('../../utils/emojis.json');
const { stripIndent } = require('common-tags');

module.exports = class SetPrefixCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setip',
      aliases: ['setip', 'sip'],
      usage: 'setip <IP>',
      description: 'Sets the `IP` for your server.',
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD'],
      examples: ['setip test.net']
    });
  }
  run(message, args) {
    const oldServerIp = message.client.db.settings.selectServerIp.pluck().get(message.guild.id) || '`None`';

    const embed = new MessageEmbed()
      .setTitle('Settings: `System`')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(`The \`server IP\` was successfully updated. ${success}`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    // Clear if no args provided
    if (args.length === 0) {
      message.client.db.settings.updateServerIp.run(null, message.guild.id);
      return message.channel.send(embed.addField('Server IP', `${oldServerIp} ➔ \`None\``));
    }

    const ip = args[0]
    const uIp = '`' + ip + '`'
    message.client.db.settings.updateServerIp.run(uIp, message.guild.id);
    message.channel.send(embed
      .addField('Server IP', `${oldServerIp} ➔ \`${ip}\``));
  }
};
