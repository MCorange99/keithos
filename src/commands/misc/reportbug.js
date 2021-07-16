const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class ReportBugCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reportbug',
      aliases: ['bugreport', 'report', 'bug', 'rb', 'br'],
      usage: 'reportbug <message>',
      description: oneLine`
        Sends a message to the Keithos Support Server's bug report channel.
        When reporting a bug, please include as much information as possible.
      `,
      type: client.types.MISC,
      examples: ['reportbug bot is botched'],
      toggleCooldown: true,
      cooldown: 15
    });
  }
  run(message, args) {
    const reportChannel = message.client.channels.cache.get(message.client.bugReportChannelId);
    if (!reportChannel)
      return this.sendErrorMessage(message, 1, 'The bugReportChannelId property has not been set');
    if (!args[0]) return this.sendErrorMessage(message, 0, 'Please provide a message to send');
    let report = message.content.slice(message.content.indexOf(args[0]), message.content.length);

    // Send report
    const reportEmbed = new MessageEmbed()
      .setTitle('Bug Report')
      .setThumbnail(reportChannel.guild.iconURL({ dynamic: true }))
      .setDescription(report) 
      .addField('User', message.member, true)
      .addField('Server', message.guild.name, true)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    reportChannel.send(reportEmbed);

    // Send response
    if (report.length > 1024) report = report.slice(0, 1021) + '...';
    const embed = new MessageEmbed()
      .setTitle('Bug Report')
      .setThumbnail('https://raw.github.com/MCorange99/keithos/blob/main/data/images/Calypso.png')
      .setDescription(oneLine`
        Successfully sent bug report!
        Please join the [Kiethos Support Server](https://discord.gg/M7nDZxKk24) to further discuss your issue.
        Additionally, feel free to submit an issue on [GitHub](https://github.com/MCorange99/keithos/issues).
      `) 
      .addField('Member', message.member, true)
      .addField('Message', report)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};