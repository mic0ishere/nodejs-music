const discord = require('discord.js')
module.exports = async function (message, client) {
    let bot = client
    const args = message.content.split(" ");
    let collectors = {}
    collectors.answer = {}
    collectors.collector= {}
    let dm = await message.author.createDM()
    const apply = async (question, number, next) => {
        message.author.send(question).catch(err => console.log(err))
            collectors.collector[number] = new discord.MessageCollector(dm, m => m.author.id == message.author.id)
            collectors.collector[number].on("collect", async (m) => {
                collectors.answer[number] = m.content
                console.log(collectors.answer[number])
                collectors.collector[number].stop()
                if(!next) return
                else return next()
            })
            collectors.collector[number].on("end", () => {})
    }
    if(!args[1]) return message.channel.send("You need to provide correct rank name you want apply for!")
    if(args[1].toLowerCase() == "special") {
        message.channel.send("I sent you some DMs, check that out!")
        await apply("What is your Discord Username? (including discriminator, Example: Zhoryth#7845)", 1, async () => {
            await apply("What is your Roblox Username? (Example: GPC_Zhoryth)", 2, async () => {
            await apply("How old are you?", 3, async () => {
            await apply("What is your motivation for this role?", 4, async () => {
            await apply("How many stars do you have in-game? (1-5, BRM5)", 5, async () => {
            await apply("What is your current rank?", 6, async () => {
            await apply("How can we trust you so no documents get leaked?", 7, async () => {
                dm.send("Submit this application?").then(async msg => {
                    await msg.react("✅")
                    await msg.react("❌")
                    const reaction = new discord.ReactionCollector(msg, (reaction, user) => user.id == message.author.id)
                reaction.on('collect', r => {
                    console.log(r)
                    if(r.emoji.name == "✅") {
                        try {
                            let embed = new discord.MessageEmbed()
                            .setTitle("New application for Special Forces")
                            .setDescription(`What is your Discord Username: ${collectors.answer[1]}\nWhat is your Roblox Username: ${collectors.answer[2]}\nHow old are you: ${collectors.answer[3]}\nWhat is your motivation for this role: ${collectors.answer[4]}\n` +
                            `How many stars do you have in-game? (1-5, BRM5): ${collectors.answer[5]}\nWhat is your current rank: ${collectors.answer[6]}\nHow can we trust you so no documents get leaked: ${collectors.answer[7]}`)
                            bot.channels.cache.find(x => x.id == 738381932764594235)
                            .send(embed)
                            reaction.stop()
                        } catch (err) {
                            console.log(err)
                        }
                    } else return reaction.stop()
                });
                reaction.on('end', () => {})
                })
            })})})})})})})
            
    } else if(args[1].toLowerCase() == "recruit") {
        message.channel.send("I sent you some DMs, check that out!")
        await apply("What is your Discord Username? (including discriminator, Example: Zhoryth#7845)", 1, async () => {
            await apply("What is your Roblox Username? (Example: GPC_Zhoryth)", 2, async () => {
            await apply("How old are you?", 3, async () => {
            await apply("What callsign do you want to have?", 4, async () => {
            await apply("Have you read the guidelines? (Yes/no)", 5, async () => {
            await apply("What does GPC stand for? (Abbreviation)", 6, async () => {
            await apply("What do you do when an officer says SFL? (Explain in your own words)", 7, async () => {
            await apply("What do you do when an officer says STS? (Explain in your own words)", 8, async () => { 
            await apply("Which frequency do we use for training?", 9, async () => {
            await apply("What does Ace Check Yellow mean?", 10, async () => {
            await apply("When does the rearman enter the room?", 11, async () => {
            await apply("When does the Breacher enter the room?", 12, async () => {
            await apply("When do you enter the aircraft?", 13, async () => {
            await apply("Explain why you shouldn't harras other members.", 14, async () => {
                dm.send("Submit this application?").then(async msg => {
                    await msg.react("✅")
                    await msg.react("❌")
                    const reaction = new discord.ReactionCollector(msg, (reaction, user) => user.id == message.author.id)
                reaction.on('collect', r => {
                    console.log(r)
                    if(r.emoji.name == "✅") {
                        try {
                            dm.send("Application sent!")
                           let embed = new discord.MessageEmbed()
                            .setTitle("New application for Recruit")
                            .setDescription(`What is your Discord Username: ${collectors.answer[1]}\nWhat is your Roblox Username: ${collectors.answer[2]}\nHow old are you: ${collectors.answer[3]}\nWhat callsign do you want to have: ${collectors.answer[4]}\n` +
                            `Have you read the guidelines (Yes/no): ${collectors.answer[5]}\nWhat does GPC stand for (Abbreviation): ${collectors.answer[6]}\nWhat do you do when an officer says SFL (Explain in your own words): ${collectors.answer[7]}\nWhat do you do when an officer says STS (Explain in your own words): ${collectors.answer[8]}` +
                            `Which frequency do we use for training: ${collectors.answer[9]}\nWhat does Ace Check Yellow mean: ${collectors.answer[10]}\nWhen does the rearman enter the room: ${collectors.answer[11]}\nWhen does the Breacher enter the room: ${collectors.answer[12]}` +
                            `When do you enter the aircraft: ${collectors.answer[13]}\nExplain why you shouldn't harras other members: ${collectors.answer[14]}`)
                            bot.channels.cache.find(x => x.id == 738381932764594235)
                            .send(embed)
                            reaction.stop()
                        } catch (err) {
                            console.log(err)
                        }
                    } else return reaction.stop()
                });
            })
        })})})})})})})})})})})})})})
    } else return message.channel.send("You need to provide correct rank name you want apply for!")
}
