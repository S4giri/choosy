const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberAdd'
        })
    }

    run = async (member) => {

        if (member.guild.id == process.env.SUPPORT) {
            const guildDB = await this.client.db.guilds.findById(member.guild.id)

            const USERS = await member.guild.roles.cache.find((r) => r.id == "997878061284458526")

            member.roles.add(USERS).catch(() => { return; });

            if (guildDB?.welcome) {
                const welcomeChannel = member.guild.channels.cache.get(guildDB.welcome.channel)

                welcomeChannel?.send(`${member.toString()}, seja bem vindo ao nosso servidor!`)
            }

        }
    }
}