module.exports = async function (message, serverQueue) {
    const voiceChannel = await message.member.voice.channel
    if (!serverQueue) return message.channel.send("No song/s currently playing in this guild.");
    if (!voiceChannel || voiceChannel.id !== serverQueue.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the shuffle command.");
    let song = serverQueue.songs[0]
    serverQueue.songs.shift()
    for(let i = serverQueue.songs.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = serverQueue.songs[i]
        serverQueue.songs[i] = serverQueue.songs[j]
        serverQueue.songs[j] = temp
    }
    serverQueue.songs.unshift(song)
    message.channel.send('Shuffled the queue');
}