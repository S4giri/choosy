const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'voiceStateUpdate'
        })
    }

    run = async (oldMember, newMember) => {

        const player = this.client.manager.get(oldMember.guild.id)

        if (newMember.channelId === null) { // Leave
            let voiceChannel = this.client.guilds.cache.get(oldMember.guild.id).channels.cache.get(oldMember.channelId);
            let mochila = [];

            voiceChannel.members.map(async (r) => {
                if (!r.user.bot) {
                    mochila.push(r.user.id);
                }
            });

            if (mochila.length == 0) {
                if (!player) return;
                const CANAL_BYE = this.client.channels.cache.get(player.textChannel);
                CANAL_BYE.send({ content: `Foi bom ouvir com você, até mais <@!${oldMember.id}>. 👋` })

                player.destroy();
            }

        }

    }
}