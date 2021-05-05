module.exports = {
    name: 'member',
    description: "Adds / unnads member role",
    execute(client, message, args){

            if(message.member.roles.cache.has('836158079547998240')){
                message.channel.send('Took member role');
                message.member.roles.remove('836158079547998240')



            } else {
                message.channel.send('Gave member role');
                message.member.roles.add('836158079547998240').catch(console.error);
    
            }



    }
}