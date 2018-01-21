const config = require("./config.json");

const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith(".announce ") && msg.author.id === config.owner) {
    let text = msg.content.substr(10);
    msg.reply(text);
    config.channels.forEach( (channel) => {
      client.channels.get(channel).send(text);
    });
    msg.reply("Sent!")
  } else if (msg.content === ".announcehere") {
    if (config.channels.includes(msg.channel.id)) {
      return
    } else if (! msg.author.permissions.hasPermission("administrator")) {
      return
    }
	  
    config.channels.push(msg.channel.id);
    console.log(`${msg.channel.name} added to announcement channels`);
    fs.writeFile("./config.json", JSON.stringify(config), (err) => {
      if (err) {
	return console.log(err);
      }
    });
  }
});

client.login(config.token);
