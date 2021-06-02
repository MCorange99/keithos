const Command = require('../Command.js');

//can replace MyCommandName with your command name 
module.exports = class MyCommandName extends Command {
  constructor(client) {
    super(client, {
      name: '', //command name
      usage: '', //usage for the command, example: ping (prepends prefix in the help command btw)
      description: '', //description for it
      type: client.types.INFO //can be any available types, look in this.types in client.js file
    });
  }
  async run(message, args) {
  // your code that will execute
  }
}