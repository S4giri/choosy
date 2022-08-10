const Event = require('../../structures/Event')
const moment = require('moment')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildCreate'
        })
    }

    run = async (guild) => {

        //await this.client.newGuildCommands(guild);

        const CANAL_JOIN_LOGS = await this.client.channels.cache.get("1001962211230617693")

        let SERVER = this.client.guilds.cache.get(process.env.SUPPORT)
        let emojiList = SERVER.emojis.cache.map(emoji => emoji)

        let emoji = emojiList[Math.floor(Math.random() * emojiList.length)]
        CANAL_JOIN_LOGS.send(`<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}> \`[${moment(Date.now()).format(`HH:mm`)}]\` Fui adicionada em **${guild.name}**.`);

    }
}