const Command = require('../Command.js');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = class MyCommandName extends Command {
  constructor(client) {
    super(client, {
      name: 'play', 
      usage: 'play lofi music',
      aliases: ['p', 'skip', 's', 'stop', 'st'], 
      description: 'the whole music bot in one command file', 
      userPermissions: ['CONNECT', 'SPEAK'],
      type: client.types.FUN 
    });
  }
  async run(message, args) {

    const prefix = message.client.db.settings.selectPrefix.get(message.guild.id);
    const x = message.content.replace(prefix, "").split(" ")[0]

      //Checking for the voicechannel and permissions (you can add more permissions if you like).
      const voice_channel = message.member.voice.channel;
      if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');


      //This is our server queue. We are getting this server queue from the global queue.
      const server_queue = queue.get(message.guild.id);

      //If the user has used the play command
      if (x === 'play' || x === 'p'){
          if (!args.length) return message.channel.send('You need to send the second argument!');
          let song = {};

          //If the first argument is a link. Set the song object to have two keys. Title and URl.
          if (ytdl.validateURL(args[0])) {
              const song_info = await ytdl.getInfo(args[0]);
              song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
          } else {
              //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
              const video_finder = async (query) =>{
                  const video_result = await ytSearch(query);
                  return (video_result.videos.length > 1) ? video_result.videos[0] : null;
              }

              const video = await video_finder(args.join(' '));
              if (video){
                  song = { title: video.title, url: video.url }
              } else {
                   message.channel.send('Error finding video.');
              }
          }

          //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
          if (!server_queue){

              const queue_constructor = {
                  voice_channel: voice_channel,
                  text_channel: message.channel,
                  connection: null,
                  songs: []
              }
              
              //Add our key and value pair into the global queue. We then use this to get our server queue.
              queue.set(message.guild.id, queue_constructor);
              queue_constructor.songs.push(song);
  
              //Establish a connection and play the song with the vide_player function.
              try {
                  const connection = await voice_channel.join();
                  queue_constructor.connection = connection;
                  video_player(message.guild, queue_constructor.songs[0]);
              } catch (err) {
                  queue.delete(message.guild.id);
                  message.channel.send('There was an error connecting!');
                  throw err;
              }
          } else{
              server_queue.songs.push(song);
              return message.channel.send(`👍 **${song.title}** added to queue!`);
          }
      }

      else if(x === 'skip' || x === 's') skip_song(message, server_queue);
      else if(x === 'stop' || x === 'st') stop_song(message, server_queue);
  }
  
}

const video_player = async (guild, song) => {
  const song_queue = queue.get(guild.id);

  //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
  if (!song) {
      song_queue.voice_channel.leave();
      queue.delete(guild.id);
      return;
  }
  const stream = ytdl(song.url, { filter: 'audioonly' });
  song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
  .on('finish', () => {
      song_queue.songs.shift();
      video_player(guild, song_queue.songs[0]);
  });
  await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
}

const skip_song = (message, server_queue) => {
  if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
  if(!server_queue){
      return message.channel.send(`There are no songs in queue 😔`);
  }
  server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
  if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
  server_queue.songs = [];
  server_queue.connection.dispatcher.end();
 }
