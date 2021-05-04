module.exports = {
    name: 'unmute',
    description: "unmutes the specified user",
    execute(message, args){

        if(message.member.roles.cache.has('822077733348573204')){
            const target = message.mentions.users.first();
            if(target){
                let mainRole = message.guild.roles.cache.find(role => role.name === 'Member')
                let muteRole = message.guild.roles.cache.find(role => role.name === 'muted')

                let memberTarget = message.guild.members.cache.get(target.id) 

                memberTarget.roles.remove(muteRole.id)
                memberTarget.roles.add(mainRole.id)
                message.channel.send(`<@${memberTarget.user.id}> has been unmuted.`)

            } else{
                message.channel.send('Couldn`t unmute that member.')
            }

        } else {message.channel.send('Insuficient permissions!')}
    }
}