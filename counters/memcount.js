module.exports = async (client) =>{
    const guild = client.guilds.cache.get('783055658459201597');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('839125557291253891');
        channel.setName(`Member Count: ${memberCount.toLocaleString()}`);
        console.log('Updating Member Count');
    }, 5000);
}
 
