const Event = require('../../structures/Event')
const Guild = require('../../database/geral/Guild')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildDelete'
        })
    }

    run = async (guild) => {

        // Fazer deletar da DATABASE 24 horas após a expulsão
        await this.client.db.guilds?.deleteMany({ _id: guild.id })

    }
}