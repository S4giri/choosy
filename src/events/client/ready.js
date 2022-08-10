const Event = require('../../structures/Event')
const Box = require("cli-box")
const pack = require("../../../package.json")
//const t_notif = require("../../updates/misc/twitch")
//const y_notif = require("../../updates/misc/youtube")
//const axios = require('axios')
//const { MessageEmbed } = require('discord.js')
const User = require("../../database/geral/User");

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {

        const ClientBox = new Box({
            w: Math.floor(this.client.user.tag.length + 27),
            h: 7,
            stringify: false,
            marks: {
                nw: '╭',
                n: '─',
                ne: '╮',
                e: '│',
                se: '╯',
                s: '─',
                sw: '╰',
                w: '│'
            },
            hAlign: 'left',
        }, `C L I E N T   I N F O R M A T I O N
Client Details    ::    ${this.client.user.tag}
Guilds Count      ::    ${this.client.guilds.cache.size}
User Count        ::    ${this.client.users.cache.size}
Shards Count      ::    ${this.client.shard.count} / ${this.client.shard.count}
NodeJS Version    ::    ${process.version}
`).stringify()

        console.log(ClientBox)

        this.client.user.setActivity("» Fui reiniciada!")

        //await this.client.updateCommands();
        //await this.client.deleteCommands();
        await this.client.connectToDatabase();
        //await this.client.updateFamosinhoClub()

        //const CANAL_NOTIF = await this.client.channels.cache.get("997199417763450943")
        //await t_notif.twitch(CANAL_NOTIF, axios, MessageEmbed);
        //await y_notif.youtube(CANAL_NOTIF, axios);

        const updateStatus = async () => {
            const stts = [
                `» /help`
            ];

            this.client.user.setActivity(`${stts[Math.floor(Math.random() * stts.length)]}`, { type: "PLAYING" });
        }

        setInterval(() => {
            updateStatus();
        }, 12000)

        await User.updateMany({ "love.marry.pendente.status": true }, { "love.marry.pendente.status": false })


    }
}