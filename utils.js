const { Message } = require("discord.js");

module.exports = function play(guild, song, queue) {
    console.log(process.stdout)
    const ytdl = require("ytdl-core")
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        serverQueue.textChannel.send("I left the channel because there were no songs left in queue")
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0], queue);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 50);
    serverQueue.textChannel.send(`Started playing: **${song.title}**`);
}