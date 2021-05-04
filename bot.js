// Run dotenv

require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});

const prefix = '=';

const fs = require('fs');

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)

}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member')

    guildMember.roles.add(welcomeRole)
    guildMember.guild.channels.cache.get('834173893228757002').send(`Hey <@${guildMember.user.id}> , welcome to Dream Smp Clone! Check out #rules before you begin! 
    
    (Psst! Contact an admin to get access to SMP servers. Have fun!)`)
});
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args)
    } else if (command === 'ip'){
        client.commands.get('ip').execute(message, args)
    } else if (command === 'kick'){
        client.commands.get('kick').execute(message, args)
    } else if (command === 'member'){
        client.commands.get('member').execute(message, args)
    } else if (command === 'help'){
        client.commands.get('help').execute(message, args, Discord)
    } else if (command === 'clear'){
        client.commands.get('clear').execute(message, args, )
    } else if (command === 'ban'){
        client.commands.get('ban').execute(message, args, )
    } else if (command === 'mute'){
        client.commands.get('mute').execute(message, args, )
    } else if (command === 'tempmute'){
        client.commands.get('tempmute').execute(message, args, )
    } else if (command === 'unmute'){
        client.commands.get('unmute').execute(message, args, )
    } else if (command === 'reactionrole'){
        client.commands.get('reactionrole').execute(message, args, Discord, client )
    }
});

client.login('ODM3MzcxMDkwNzgzMTc0Njk2.YIrkmQ.oCNXlpIMQJmjdai_aYU1l2WWTjY');

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
