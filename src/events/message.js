const { MessageEmbed, Collection } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = (client, message) => {
  if (message.channel.type === 'dm' || !message.channel.viewable || message.author.bot) return;

  // Get disabled commands
  let disabledCommands = client.db.settings.selectDisabledCommands.pluck().get(message.guild.id) || [];
  if (typeof (disabledCommands) === 'string') disabledCommands = disabledCommands.split(' ');

  // Get points
  const { point_tracking: pointTracking, message_points: messagePoints, command_points: commandPoints } =
    client.db.settings.selectPoints.get(message.guild.id);

  // Command handler
  const prefix = client.db.settings.selectPrefix.pluck().get(message.guild.id);
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s*`);

  if (prefixRegex.test(message.content)) {

    // Get mod channels
    let modChannelIds = message.client.db.settings.selectModChannelIds.pluck().get(message.guild.id) || [];
    if (typeof (modChannelIds) === 'string') modChannelIds = modChannelIds.split(' ');

    const [, match] = message.content.match(prefixRegex);
    const args = message.content.slice(match.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd) || client.aliases.get(cmd); // If command not found, check aliases
    if (command && !disabledCommands.includes(command.name)) {

      // Check if mod channel
      if (modChannelIds.includes(message.channel.id)) {
        if (
          command.type != client.types.MOD || (command.type == client.types.MOD &&
            message.channel.permissionsFor(message.author).missing(command.userPermissions) != 0)
        ) {
          // Update points with messagePoints value
          if (pointTracking)
            client.db.users.updatePoints.run({ points: messagePoints }, message.author.id, message.guild.id);
          return; // Return early so Calypso doesn't respond
        }
      }

      if (command.toggleCooldown) {

        if (!client.cooldowns.has(command.name)) {
          client.cooldowns.set(command.name, new Collection());
        };

        const time = client.cooldowns.get(command.name);
        const amount = (command.cooldown || 5) * 1000;

        if (time.has(message.author.id)) {

          const expire = time.get(message.author.id) + amount;

          if (Date.now() < expire) {
            const left = (expire - Date.now()) / 1000;

            return message.channel.send(`The command is currently on \`${left.toFixed(1)}\` seconds`);
          };
        };

        time.set(message.author.id, Date.now());
        setTimeout(() => time.delete(message.author.id), amount);

      };

      // Check permissions
      const permission = command.checkPermissions(message);
      if (permission) {

        // Update points with commandPoints value
        if (pointTracking)
          client.db.users.updatePoints.run({ points: commandPoints }, message.author.id, message.guild.id);
        message.command = true; // Add flag for messageUpdate event
        return command.run(message, args); // Run command
      }
    } else if (
      (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) &&
      message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS']) &&
      !modChannelIds.includes(message.channel.id)
    ) {
      const embed = new MessageEmbed()
        .setTitle('Hi, I\'m Calypso. Need help?')
        .setThumbnail('https://raw.github.com/MCorange99/keithos/blob/main/data/images/Calypso.png')
        .setDescription(`You can see everything I can do by using the \`${prefix}help\` command.`)
        .addField('Invite Me', oneLine`
          You can add me to your server by clicking 
          [here](https://discord.com/oauth2/authorize?client_id=837371090783174696&permissions=4294967287&redirect_uri=https%3A%2F%2Fdiscord.events.stdlib.com%2Fdiscord%2Fauth%2F&scope=bot%20applications.commands)!
        `)
        .addField('Support', oneLine`
          If you have questions, suggestions, or found a bug, please join the 
          [Calypso Support Server](https://discord.gg/M7nDZxKk24)!
        `)
        .setFooter('DM MCorange#0001 to speak directly with the developer!')
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    }
  }

  // Update points with messagePoints value
  if (pointTracking) client.db.users.updatePoints.run({ points: messagePoints }, message.author.id, message.guild.id);
};

