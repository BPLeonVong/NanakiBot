const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('../config.json');
const fs = require("fs");

client.login(config.token);


client.on('ready', () => {
  console.log('I am ready!');
});

client.on("message", (message) => {

    if (!message.content.startsWith(config.prefix)) return;

    if (message.author.id !== config.ownerID) return;
    
    if (message.content.startsWith(config.prefix + "Who?")) {
	message.channel.sendMessage("Everyone around the world, it's Nanaki.");
    }
    if (message.content.startsWith(config.prefix + "Smile")) {
	message.channel.sendMessage("Highly reputable Nanakismile. Everyone around the world, it's Nanaki.");
    }

    if(message.content.startsWith(config.prefix + "prefix")) {
	// get arguments for the command, as: !prefix +
	let args = message.content.split(" ").slice(1);
	// change the configuration in memory
	config.prefix = args[0];

	// Now we have to save the file.
	fs.writeFile('../config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
    }
});
