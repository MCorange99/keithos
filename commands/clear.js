module.exports = {
    name: 'clear',
    description: "clears the number of messages specified",
    async execute(client, message, args){

        if(message.member.roles.cache.has('822077733348573204')){
            
        if(!args[0]) return message.reply("You have to specify the amount of messages to clear. What an idiot...")
        if(isNaN(args[0])) return message.reply("What are you 12 or something ? You need to use a real number.")

        if(args[0] > 100) return message.reply("You cant delete that many messages at once! At most it should be 100.")
        if(args[0] < 1) return message.reply("I cant delete negative messages! ")

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
            message.channel.send('Messages deleted')
        });
        } else {message.channel.send('Insuficient permissions!')}
    }
}