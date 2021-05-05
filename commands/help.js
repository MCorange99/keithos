module.exports = {
    name: 'help',
    description: "Lists all the available commands",
    execute(message, args, Discord){
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#738adb')
        .setTitle('Keithos bot help page.')
        //.setURL('https://youtu.be/dQw4w9WgXcQ')
        .setDescription('Gives all of the available commands in keithos. The current prefix is "="')
        .addFields(
            {name: 'help', value: 'Shows this page.'},
            {name: 'ip', value: 'Shows the current server IP.'},
            {name: 'kick', value: 'Kick a specified user.'},
            {name: 'ban', value: 'bans a specified user from the server.'},
            {name: 'member', value: 'Adds and deletes the member role from you.'},
            {name: 'ping', value: 'Pings the bot to check if its online.'},
            {name: 'mute', value: 'Mutes specified user if time is not specified user will be muted indefinetly.'},
            {name: 'unmute', value: 'Unmutes specified user.'},
            {name: 'play', value: 'Plays mentioned song/link.'},
            {name: 'leave', value: 'Stops music and leaves the music channel.'},
            
        )

        message.channel.send(helpEmbed);

    }
}