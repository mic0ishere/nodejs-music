const { MessageEmbed } = require("discord.js");

module.exports = async function (message, serverQueue) {
    const voiceChannel = await message.member.voice.channel
    if (!serverQueue) return message.channel.send("No song/s currently playing in this guild.");
    if (!voiceChannel || voiceChannel.id !== serverQueue.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the queue command.");
    let index = 1;
    let string = "";

    if (serverQueue.songs[0]) string += `__**Currently Playing**__\n ${serverQueue.songs[0].title}\n`;
    if (serverQueue.songs[1]) string += `__**Rest of queue:**__\n ${serverQueue.songs.slice(1, 16).map(x => `**${index++})** ${x.title}`).join("\n")}`;

    const embed = new MessageEmbed()
        .setAuthor(`Current Queue for ${message.guild.name}`, message.guild.iconURL)
        .setDescription(string);

    return message.channel.send(embed);
}