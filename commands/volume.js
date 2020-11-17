module.exports = async function (message, serverQueue) {
    const voiceChannel = await message.member.voice.channel
    const args = message.content.split(" ");
    if (!serverQueue) return message.channel.send("No song/s currently playing in this guild.");
    if (!voiceChannel || voiceChannel.id !== serverQueue.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the volume command.");
    if (!args[1]) return message.channel.send(`Current volume: ${serverQueue.volume}`)
    if (args[1] > 100 || args[1] < 1) return message.channel.send("You must select volume between 1-100")
    serverQueue.volume = args[1]
    return message.channel.send(`Succesfully setted volume to ${args[1]}.`)
}