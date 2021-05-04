const ms = require('ms')
module.exports = {
    name: 'mute',
    description: "mutes the specified user",
    execute(message, args){

        if(message.member.roles.cache.has('822077733348573204')){
            const target = message.mentions.users.first();
            if(target){
                let mainRole = message.guild.roles.cache.find(role => role.name === 'Member')
                let muteRole = message.guild.roles.cache.find(role => role.name === 'muted')

                let memberTarget = message.guild.members.cache.get(target.id) 

                if(!args[1]){ 
                    memberTarget.roles.remove(mainRole.id)
                    memberTarget.roles.add(muteRole.id)
                    message.channel.send(`<@${memberTarget.user.id}> has been muted.`)
                    return
                }

                memberTarget.roles.remove(mainRole.id)
                memberTarget.roles.add(muteRole.id)
                message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}.`)
                
                setTimeout(function() {
                    memberTarget.roles.remove(muteRole.id)
                    memberTarget.roles.add(mainRole.id)


                }, ms(args[1]));
            } else{
                message.channel.send('Couldn`t mute that member.')
            }

        } else {message.channel.send('Insuficient permissions!')}
    }
}