const { MessageEmbed } = require("discord.js");
const Command = require("../Command");

module.exports = class MembersCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'members',
            aliases: ['membs'],
            usage: 'members',
            description: 'Displays a list of members from every Calypso\'s joined servers.',
            type: client.types.OWNER,
            ownerOnly: true
        })
    };

    async run (message) {

        const members = [];

         message.client.guilds.cache.array().map(m => {
            m.members.cache.forEach(x => {
                members.push(`\`${x.user.tag}\` - **${x.guild.name}**`);
            });
          });
      
          const embed = new MessageEmbed()
            .setTitle('Members')
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
      
          if (members.length <= 10) {
            const range = (members.length == 1) ? '[1]' : `[1 - ${members.length}]`;
            message.channel.send(embed.setTitle(`Members ${range}`).setDescription(members.join('\n')));
          } else {
            new ReactionMenu(message.client, message.channel, message.member, embed, members);
          }
    };
};
