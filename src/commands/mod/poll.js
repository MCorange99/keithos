const { MessageEmbed } = require("discord.js");
const Command = require("../Command");

module.exports = class poll extends Command {
    constructor(client) {
        super(client, {
            name: "poll",
            description: "Create a quick poll",
            examples: ["poll <text>", "poll [channel] <text>"],
            aliases: [],
            type: client.types.MOD,
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS'],
            userPermissions: ['MANAGE_GUILD'],
            toggleCooldown: false,
            cooldown: 6
        });
    };

    async run(message, args) {

        let channel = message.guild.channels.cache.get(args[0]) || this.getChannelFromMention(message, args[0]);

        if (!channel) {
            channel = message.channel;
        } else {
            args.shift();
        };

        const poll = args.join(" ");

        if (!poll) {
            return this.sendErrorMessage(message, 0, "You have to provide a text for the poll");
        };

        if (poll.length < 20) {
            return this.sendErrorMessage(message, 0, "Poll text must be more than 20 chars");
        };

        if (poll.length > 2048) {
            return this.sendErrorMessage(message, 0, "Poll text cannot be 2048 or more chars");
        };

        const embed = new MessageEmbed()
            .setTitle("Poll")
            .setColor("#7384ff")
            .setDescription(poll)
            .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        try {

            message.delete({ timeout: 300 });

            channel.send(embed).then(x => {
                x.react("✅");
                x.react("❌");
            });

            message.channel.send(`${message.author} has created poll in ${channel}`).then(m => {
                m.delete({ timeout: 5000 });
            });

        } catch (error) {
            return this.sendErrorMessage(message, 1, "Something went wrong", error).catch(err => { return; });
        };
    };
};
