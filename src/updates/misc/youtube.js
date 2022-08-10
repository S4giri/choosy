const { Client } = require('discord.js')
const erelaManager = require('../../structures/Manager')

module.exports = class extends Client {
    constructor(options) {
        super(options)

        this.manager = erelaManager(this)
    }

    static async youtube(CANAL_NOTIF, axios) {
        setInterval(async function () {
            let user = "UCW_ZKwcTm9JtsC1SvGIofGA"
            const title = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YT_API_KEY}&channelId=${user}&part=snippet,id&order=date&maxResults=2`)

            const YT_DB = require("../../database/Notif/Youtube");

            let data = await YT_DB.findOne({ user: user });

            if (!data) {
                await YT_DB.create({ user: user, titulo: `${title.data.items[0].snippet.title}` });

                return CANAL_NOTIF.send({ content: `Vídeo novo, corre lá!\nhttps://www.youtube.com/watch?v=${title.data.items[0].id.videoId}` })
            }

            if (data) {
                if (data.titulo === `${title.data.items[0].snippet.title}`) return;
                if (data.titulo === "This channel has no public videos.") return;

                CANAL_NOTIF.send({ content: `Vídeo novo, corre lá!\nhttps://www.youtube.com/watch?v=${title.data.items[0].id.videoId}` })

                await YT_DB.findOneAndUpdate({ user: user }, { titulo: title.data.items[0].snippet.title })
            }
        }, 5000);
    }

};
