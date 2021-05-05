module.exports = {
    name: 'kick',
    description: "This is a kick command",
    execute(client, message, args){

        if(message.member.roles.cache.has('822077733348573204')){
            const member = message.mentions.users.first();
            if(member){
                const memberTarget = message.guild.members.cache.get(member.id)
                memberTarget.kick()
                message.channel.send("User has been kicked")


            }else{
                message.channell.send('Couldn`t kick that member.')
            }


        } else {message.channel.send('Insuficient permissions!')}
    }
}