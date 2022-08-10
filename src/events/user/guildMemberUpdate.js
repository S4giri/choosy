const { MessageEmbed } = require('discord.js');
const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberUpdate'
        })
    }

    run = async (oldMember, newMember) => {

        if (newMember.guild.id == process.env.SUPPORT) {

            const hadRole = oldMember.roles.cache.find(role => role.id === '962011795126644797');
            const hasRole = newMember.roles.cache.find(role => role.id === '962011795126644797');

            if (!hadRole && hasRole) {
                const CHANNEL = await newMember.guild.channels.cache.get("955199481597538304")

                const BOOSTED = new MessageEmbed()
                    .setAuthor({ name: `${newMember.user.username} impulsionou o servidor`, iconURL: `https://cdn.discordapp.com/attachments/951219313837240360/962018505971081286/2086-nitro-boost-spin.gif` })
                    .setDescription(`Hey fofo(a), você acaba de liberar todas as minhas funções Premium, use \`/vip\` e bom aproveito.`)
                    .addField(`<:HypeSquadEvents:781426732606816256> **Premium**:`, `> Liberado`, true)
                    .addField(`<:rocket:953403053246140436> **Benefícios**:`, `> <#955198666929496166>`, true)
                    .setThumbnail(`https://cdn.discordapp.com/attachments/951219313837240360/962016587597115392/8408-discord-boost.gif`)
                    .setImage("https://cdn.discordapp.com/attachments/951219313837240360/962033637585457183/sagiri-booster.png")
                    .setColor("#ff6ff4")
                    .setFooter({ text: `Nível ${newMember.guild.premiumTier == "NONE" ? "0" : newMember.guild.premiumTier} - ${newMember.guild.premiumSubscriptionCount || "0"}/14 impulsos`, iconURL: `${newMember.guild.premiumTier == 1 ? "https://cdn.discordapp.com/emojis/781426413931855885.png?size=96&quality=lossless" : newMember.guild.premiumTier == 2 ? "https://cdn.discordapp.com/emojis/781426414116405269.png?size=96&quality=lossless" : newMember.guild.premiumTier == "3" ? "https://cdn.discordapp.com/emojis/781426414377369601.png?size=96&quality=lossless" : "https://cdn.discordapp.com/emojis/962035135753101402.png?size=96&quality=lossless"} ` })

                await CHANNEL.send({ embeds: [BOOSTED] });
            } else if (hadRole && !hasRole) {
                const CHANNEL = await newMember.guild.channels.cache.get("955199481597538304")

                const BOOSTED = new MessageEmbed()
                    .setAuthor({ name: `${newMember.user.username} parou de impulsionar`, iconURL: `https://cdn.discordapp.com/attachments/951219313837240360/962053204105895936/cancel-boosting.gif` })
                    .setDescription(`Perdeu as vantagens Premium, bobão!`)
                    .setColor("#ff6ff4")

                await CHANNEL.send({ embeds: [BOOSTED] });
            }

        }

    }
}