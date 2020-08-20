module.exports =
    async function execute(message, serverQueue, queue) {
        const ytpl = require("ytpl")
        const ytsr = require("ytsr")
        const ytdl = require("ytdl-core")
        const {
            MessageEmbed
        } = require('discord.js')
        const play = require("./play")
        let song
        const args = message.content.split(" ");
        if (!args[1]) return message.channel.send("Please provide a song name or link.")
        const voiceChannel = await message.member.voice.channel
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to use the play command.");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) return message.channel.send("I need the permissions to join and speak in your voice channel!")
        if (ytpl.validateURL(args[1])) {
            ytpl(args[1], (err, result) => {
                if (!serverQueue) {
                    const queueContruct = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 50,
                        playing: true
                    };

                    queue.set(message.guild.id, queueContruct);

                    queueContruct.songs.push({
                        title: result.items[0].title,
                        url: result.items[0].url_simple
                    });
                    result.items.shift()

                    try {
                        async function joinChannel() {
                            queueContruct.connection = await voiceChannel.join();
                            play(message.guild, queueContruct.songs[0], queue);
                            result.items.forEach(x => queue.get(message.guild.id).songs.push({
                                title: x.title,
                                url: x.url_simple
                            }))
                        }
                        joinChannel()
                    } catch (err) {
                        console.log(err);
                        queue.delete(message.guild.id);
                        return message.channel.send(err);
                    }
                } else {
                    result.items.forEach(x => serverQueue.songs.push({
                        title: x.title,
                        url: x.url_simple
                    }))
                }

            })
        } else if (ytdl.validateID(args[1]) || ytdl.validateURL(args[1])) {
            const songInfo = await ytdl.getInfo(args[1]);
            song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            }
            if (!serverQueue) {
                const queueContruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 50,
                    playing: true
                };

                queue.set(message.guild.id, queueContruct);

                queueContruct.songs.push(song);

                try {
                    async function joinChannel() {
                        queueContruct.connection = await voiceChannel.join();
                        play(message.guild, queueContruct.songs[0], queue);
                    }
                    joinChannel()
                } catch (err) {
                    console.log(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(err);
                }
            } else {
                serverQueue.songs.push(song);
                return message.channel.send(`${song.title} has been added to the queue!`);
            }
        } else {
            ytsr(args[1], (err, result) => {
                if (err) throw err
                let tracks = []
                let index = 1
                result.items.forEach(x => {
                    if (x.type == "video" && tracks.length < 10) tracks.push(x)
                })
                const embed = new MessageEmbed()
                    .setAuthor("Song Selection.", message.author.displayAvatarURL)
                    .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                    .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");

                message.channel.send(embed);
                const collector = message.channel.createMessageCollector(m => {
                    return m.author.id === message.author.id
                }, {
                    time: 30000
                });
                collector.on("collect", m => {
                    if (m.content.toLocaleLowerCase() == "cancel") return collector.stop("cancelled")
                    else if (tracks[Number(m.content) - 1]) {
                        async function getInfo() {
                            const songInfo = await ytdl.getInfo(tracks[m.content - 1].link)
                            song = {
                                title: songInfo.videoDetails.title,
                                url: songInfo.videoDetails.video_url
                            }
                            if (!serverQueue) {
                                const queueContruct = {
                                    textChannel: message.channel,
                                    voiceChannel: voiceChannel,
                                    connection: null,
                                    songs: [],
                                    volume: 50,
                                    playing: true
                                };

                                queue.set(message.guild.id, queueContruct);

                                queueContruct.songs.push(song);

                                try {
                                    async function joinChannel() {
                                        queueContruct.connection = await voiceChannel.join();
                                        play(message.guild, queueContruct.songs[0], queue);
                                    }
                                    joinChannel()
                                } catch (err) {
                                    console.log(err);
                                    queue.delete(message.guild.id);
                                    return message.channel.send(err);
                                }
                            } else {
                                serverQueue.songs.push(song);
                                return message.channel.send(`${song.title} has been added to the queue!`);
                            }
                        }
                        getInfo()
                        collector.stop()
                    }
                });

                collector.on("end", (_, reason) => {
                    if (["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection.")
                });

            })
        }
    }