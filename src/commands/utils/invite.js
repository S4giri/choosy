const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            description: 'Convide a kanna para seu servidor.',
            database: false,
            maintenance: false,

            disabled: false,
            dev: false,
            creators: false,
            admin: false,
            uPremium: false,
            gPremium: false,
            bTester: false
        })
    }

    run = async ({ interaction }, t) => {

        this.client.shard.fetchClientValues('guilds.cache.size').then(servers => {
            this.client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)).then(users => {

                interaction.reply({
                    content: `Me adicione em seu servidor, [clique aqui](https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot%20applications.commands). \<3
> <:5714pinkumbrella:1001577320085192876> **${servers.reduce((acc, guildCount) => acc + guildCount, 0)}** Servidores • <:6203peachmilk:1001577321330901072> **${users.reduce((acc, memberCount) => acc + memberCount, 0)}** Usuários

<a:cherry:1001577500553510912> **Suporte**: https://discord.gg/${process.env.CODE}
Vote em mim e ganhe recompensas! [Votar agora](https://discord.gg/${process.env.CODE})`, ephemeral: true
                })
            })
        })
    }
}