"use strict"
var Discord = require("discord.js");
var client = new Discord.Client();
var config = require('./config.json');
var data = require('./data.json')
var fs = require("fs");
var express = require('express');
var app = express();


client.login(config.token || process.env.distoken);

client.on('ready', () => {
    console.log('I am ready!');
});

client.on("message", (message) => {

    if(message.content.startsWith("Hello"))
	message.channel.sendMessage("I'm online");
    
    if (!message.content.startsWith(data.prefix)) return;

    if (message.author.bot) return;

    var reContent = message.content.replace('!','');
    
    if (data.responseObject[reContent]) {
	message.channel.sendMessage(data.responseObject[reContent]);
    }

    if(reContent.startsWith("Emote?"))
	message.channel.sendMessage("<:nanaki:294862507976163338>");

    if(reContent.startsWith("imgEmote"))
	message.channel.sendMessage("Nanakismile", {file:"nanakiTrans.png"});

    if(message.content.startsWith(data.prefix + "prefix")) {
	// get arguments for the command, as: !prefix +
	var args = message.content.split(" ").slice(1);
	// change the configuration in memory
	config.prefix = args[0];

	// Now we have to save the file.
	fs.writeFile('../data.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
    }
});

client.on("guildMemberAdd", (member) => {
  member.guild.defaultChannel.sendMessage(`"Welcome, My name is Nanaki. If there is anything you require please say it.${member.user.username}"-sama.`);
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
