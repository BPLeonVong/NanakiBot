"use strict"
var Discord  = require("discord.js"),
    express  = require('express'),
    data     = require('./data.json'),
    client   = new Discord.Client(),
//    app      = express(),
//    server   = require('http').Server(app),
    socketIO = require('socket.io'),
    config   = {};

const PORT = process.env.PORT || 5000;

//const server = express()
//  .use((req, res) => res.sendFile(INDEX) )
//  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

//const io = socketIO(server);

const server = express()
//  .use((req, res) => res.sendFile("index.ejs") )
      .set('view engine','ejs')
.use(express.static("public"))
.use(express.static("lib"))
.use(express.static("images"))
//Default Page
.get('/', function(req, res) {
    res.render("index.ejs");
})

//Farm Application Page
.get('/farmApp', function(req, res) {
    res.render("FarmApp.ejs");
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

try {
    var config = require('./config.json');   
} catch (ex) {}

var field = (function(text){
    this.text = text;
});
var fields = ["/nanakiTrans.png","/shuumatsu2.min.gif"];
var fieldsDATABASE = [];
var updateRequired = true;

//Auth. Bot
client.login(config.token || process.env.distoken);

//When Bot comes on
client.on('ready', () => {
});

//When Someone Joins The Server
client.on("guildMemberAdd", (member) => {
  member.guild.defaultChannel.sendMessage(`"Welcome, My name is Nanaki. If there is anything you require please say it.${member.user.username}"-sama.`);
});

//When Message Has Occured
client.on("message", (message) => {
       
    if (!message.content.startsWith(data.prefix)) return;

    if (message.author.bot) return;

    var reContent = message.content.replace('!','');
    
    if (data.responseObject[reContent]) {
	message.channel.sendMessage(data.responseObject[reContent]);
    }

    //Emote Image Calling Test
    if(reContent.startsWith("Emote?"))
	message.channel.sendMessage("<:nanaki:294862507976163338>");

    //Image Raw Calling Test
    if(reContent.startsWith("imgEmote"))
	message.channel.sendMessage("Nanakismile", {file:"images/nanakiTrans.png"});

    //Emote Raw Calling Test
    if(reContent.startsWith("gifEmote"))
	message.channel.sendMessage("Nanakismile", {file:"images/shuumatsu2.gif"});

    //Emote Raw Calling Test min    
    if(reContent.startsWith("gifEmoteMin"))
	message.channel.sendMessage("Nanakismile2", {file:"images/shuumatsu2.min.gif"});

    if(reContent.startsWith("testConnection"))
    {
	fields.push("/nanaki.png");
	message.channel.sendMessage("Testing Complete" );
	console.log(fields.length);
	updateRequired=true;
    }

    if(message.content.startsWith(data.prefix + "prefix")) {
	// get arguments for the command, as: !prefix +
	var args = message.content.split(" ").slice(1);
	// change the configuration in memory
	config.prefix = args[0];
	// Now we have to save the file.
	fs.writeFile('../data.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
    }
});

//Express
//app.listen('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));
//server.listen(5000 || PORT);

//Port
/*app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
*/

io.on('connection', function (socket) {
    // socket.emit('news', { hello: 'world' });
    // io.emit('refresh feed', { data: "Hello" });
    setInterval(function(){
	if(updateRequired) {
	    updateRequired=false;
	    fieldsDATABASE=fields;
	    console.log("Emitting");
	    socket.emit('refresh feed', {fields: fieldsDATABASE});
	}
    }, 3000);
    
    socket.on('update', function (data) {
	console.log("Emitting");
	fieldsDATABASE=fields;
	socket.emit('refresh feed', {fields: fieldsDATABASE});
    });
    //message.channel.sendMessage("Nanakismile Now Testing Connection" );
});
