module.exports = {
    name: 'ban',
    description: "Tbans people from your server",
    execute(message, args){

        if(message.member.roles.cache.has('822077733348573204')){
            const member = message.mentions.users.first();
            if(member){
                const memberTarget = message.guild.members.cache.get(member.id)
                memberTarget.ban()
                message.channel.send("User has been banned")


            }else{
                message.channell.send('Couldn`t ban that member.')
            }


        } else {message.channel.send('Insuficient permissions!')}
    }
}