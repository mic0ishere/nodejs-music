const {
    Client
} = require('discord.js')
require('dotenv').config()
const { token, prefix } = process.env
const playCmd = require("./commands/play")
const leaveCmd = require("./commands/leave")
const shuffleCmd = require("./commands/shuffle")
const skipCmd = require("./commands/skip")
const queueCmd = require("./commands/queue")
const volumeCmd = require("./commands/volume")

const client = new Client()
const queue = new Map();

client.once("ready", () => {
    console.log("Ready!");
});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const serverQueue = queue.get(message.guild.id);
    try {
        if (message.content.startsWith(`${prefix}play`)) {
            playCmd(message, serverQueue, queue);
            return;
        } else if (message.content.startsWith(`${prefix}skip`)) {
            skipCmd(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}leave`)) {
            leaveCmd(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}shuffle`)) {
            shuffleCmd(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}queue`)) {
            queueCmd(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${prefix}volume`)) {
            volumeCmd(message, serverQueue);
            return;
            
        } else {
            message.channel.send("You need to enter a valid command!");
        }
    } catch (error) {
        console.log(error)
    }
});
client.login(token)