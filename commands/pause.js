module.exports = async function (message, serverQueue) {
    const voiceChannel = await message.member.voice.channel
    if (!serverQueue) return message.channel.send("No song/s currently playing in this guild.");
    if (!voiceChannel || voiceChannel.id !== serverQueue.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the pause command.");
    return message.channel.send("That command is not avaliable!");
}