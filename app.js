"use strict"
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('config.json');
const fs = require("fs");

client.login(config.token);

client.on('ready', () => {
    console.log('I am ready!');
});

client.on("message", (message) => {

    if(message.content.startsWith("Hello"))
	message.channel.sendMessage("I'm online");
    
    if (!message.content.startsWith(config.prefix)) return;

    if (message.author.bot) return;

    var reContent = message.content.replace('!','');

    console.log(message.content);
    
    if (config.responseObject[reContent]) {
	message.channel.sendMessage(config.responseObject[reContent]);
    }

    if(message.content.startsWith(config.prefix + "prefix")) {
	// get arguments for the command, as: !prefix +
	var args = message.content.split(" ").slice(1);
	// change the configuration in memory
	config.prefix = args[0];

	// Now we have to save the file.
	fs.writeFile('../config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
    }
});

client.on("guildMemberAdd", (member) => {
  member.guild.defaultChannel.sendMessage(`"Welcome, My name is Nanaki. If there is anything you require please say it.${member.user.username}"-sama.`);
});
