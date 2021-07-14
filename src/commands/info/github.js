const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class GitHubCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'github',
      aliases: ['gh', 'repo'],
      usage: 'github',
      description: 'Displays the link to Calypso\'s GitHub repository.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle('GitHub Link')
      .setThumbnail('https://raw.githubusercontent.com/MCorange99/keithos/blob/main/data/images/Calypso.png')
      .setDescription(oneLine`
        Click [here](https://github.com/MCorange99/keithos) to to visit my GitHub repository!
        Please support me by starring ⭐ the repo, and feel free to comment about issues or suggestions!
      `)
      .addField('Other Links',
        '**[Invite Me](https://discord.com/api/oauth2/authorize?client_id=837371090783174696&permissions=4294967287&redirect_uri=https%3A%2F%2Fdiscord.events.stdlib.com%2Fdiscord%2Fauth%2F&scope=bot%20applications.commands) | ' +
        '[Support Server](https://discord.gg/M7nDZxKk24)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
