module.exports = {
    name: 'ping',
    description: "This is a ping command",
    execute(client, message, args){
        message.channel.send('pong!');

    }
}