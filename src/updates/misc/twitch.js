const { Client } = require('discord.js')
const erelaManager = require('../../structures/Manager')

module.exports = class extends Client {
    constructor(options) {
        super(options)

        this.manager = erelaManager(this)
    }

    static async twitch(CANAL_NOTIF, axios, MessageEmbed) {
        setInterval(async function () {
            let user = "gaules"
            const avatar = await axios.get(`https://decapi.me/twitch/avatar/${user}`)
            const viewers = await axios.get(`https://decapi.me/twitch/viewercount/${user}`)
            const title = await axios.get(`https://decapi.me/twitch/title/${user}`)
            const game = await axios.get(`https://decapi.me/twitch/game/${user}`)

            const twitch = require("../../database/Notif/Twitch");
            let data = await twitch.findOne({ user: user, titulo: title.data });
            let assistindo = viewers.data

            if (viewers.text !== `${user} is offline`) {

                const embed = new MessageEmbed()
                    .setAuthor({ name: `${user}`, iconURL: `https://cdn.discordapp.com/attachments/951219313837240360/996750995566637166/Twitch-PNG-Images-HD.png` })
                    .setTitle(`${title.data}`)
                    .setThumbnail(`${avatar.data}`)
                    .setURL(`https://www.twitch.tv/${user}`)
                    .addField("Jogando", `${game.data == "Just Chatting" ? "Só na conversa" : `${game.data}`}`, true)
                    .addField("Assistindo", `${assistindo.toLocaleString()}`, true)
                    .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-620x378.jpg`)
                    .setColor("#9123ff")

                if (!data) {
                    await twitch.create({ user: user, titulo: `${title.data}` });

                    CANAL_NOTIF.send({ content: `${user} está em live!!\nhttps://www.twitch.tv/${user}`, embeds: [embed] })
                }

                if (data) {
                    if (data.titulo === `${title.data}`) return;

                    CANAL_NOTIF.send({ content: `${user} está em live!!\nhttps://www.twitch.tv/${user}`, embeds: [embed] })

                    await twitch.findOneAndUpdate({ user: user }, { titulo: title.data })
                }

            }

        }, 6000);
    }

};
