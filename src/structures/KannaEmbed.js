const Discord = require("discord.js");

module.exports = class RethEmbed extends (Discord.MessageEmbed) {
    constructor(item, data = {}) {
        super(data);

        // item[0] | Author que digitou o comando
        // item[1] | Usuário mencionado
        // item[2] | Puxar um servidor específico
        // item[3] | Puxar o @kanna
        // item[4] | Usuário mais curtido

        var isKing = false;
        if (item[4]) {
            if (item[1].id == item[4].user.id) {
                isKing = true;
            }
        }

        const member = item[2].members.cache.get(item[1].id)
        const isCreators = member ? member.roles.cache.some(role => role.id === '1001559139010486372') : false
        const isManagers = member ? member.roles.cache.some(role => role.id === '1001559214054973440') : false
        const isAdmin = member ? member.roles.cache.some(role => role.id === '1001574656215617649') : false
        const isMod = member ? member.roles.cache.some(role => role.id === '955150037690753094') : false
        const isTrialMod = member ? member.roles.cache.some(role => role.id === '955150149921951846') : false
        const isSupport = member ? member.roles.cache.some(role => role.id === '954874533016391750') : false
        const isTranslators = member ? member.roles.cache.some(role => role.id === '955150261708529735') : false
        const isEmojiReviewers = member ? member.roles.cache.some(role => role.id === '955150336606208101') : false
        const isHelpers = member ? member.roles.cache.some(role => role.id === '954869702092525568') : false
        const isPremium = member ? member.roles.cache.some(role => role.id === '955150468600971324') : false
        const isYoutuber = member ? member.roles.cache.some(role => role.id === '955150530882207854') : false

        let isMember = false;
        if (item[2].members.cache.get(item[1].id)) isMember = true

        this.setAuthor({
            name:
                item[1].id == item[3].id ? `${item[3].username}` :
                    isCreators ? `${item[3].username} » Creators` :
                        isManagers ? `${item[3].username} » Managers` :
                            isAdmin ? `${item[3].username} » Administrators` :
                                isMod ? `${item[3].username} » Moderators` :
                                    isTrialMod ? `${item[3].username} » Trial Moderators` :
                                        isSupport ? `${item[3].username} » Support` :
                                            isHelpers ? `${item[3].username} » Helpers` :
                                                isTranslators ? `${item[3].username} » Translators` :
                                                    isEmojiReviewers ? `${item[3].username} » Emoji Reviewers` :
                                                        isPremium ? `HypeSquad (VIP)` :
                                                            isKing ? `Famosinho(a)` :
                                                                isYoutuber ? `${item[3].username} » Youtubers` :
                                                                    isKing ? `Famosinho(a)` :
                                                                        isMember ? `${item[3].username} » Users` :
                                                                            `${item[1].username}'s Avatar`

            , iconURL: item[1].id == item[3].id ? `https://cdn.discordapp.com/attachments/1001575407004430426/1001576381949411528/9534-spinblossom.gif` :
                isCreators ? `https://cdn.discordapp.com/attachments/951219313837240360/953950107303280650/6632-server-owner.png` :
                    isManagers ? `https://cdn.discordapp.com/attachments/1001575407004430426/1001575424276561940/5714-pinkumbrella.png` :
                        isAdmin ? `https://cdn.discordapp.com/attachments/951219313837240360/954858998341959690/952923388752588801.png` :
                            isMod ? `https://cdn.discordapp.com/attachments/951219313837240360/954161235899850752/9299-blurple-ban.png` :
                                isTrialMod ? `https://cdn.discordapp.com/attachments/951219313837240360/954161739006631986/6982-ban-hammer.png` :
                                    isSupport ? `https://cdn.discordapp.com/attachments/951219313837240360/952828624602558464/5961-blurple-employee.png` :
                                        isHelpers ? `https://cdn.discordapp.com/attachments/951219313837240360/952826288073236540/2983-form.png` :
                                            isTranslators ? `https://cdn.discordapp.com/attachments/951219313837240360/954159286173462558/4533-language.png` :
                                                isEmojiReviewers ? `https://cdn.discordapp.com/attachments/951219313837240360/954157031860895774/3740-love-stare.png` :
                                                    isPremium ? `https://cdn.discordapp.com/emojis/939988363904188426.webp?size=96&quality=lossless` :
                                                        isKing ? `https://cdn.discordapp.com/emojis/952821675412566017.gif?size=48&quality=lossless` :
                                                            isYoutuber ? `https://cdn.discordapp.com/attachments/951219313837240360/952827235079946260/1296-youtube.png` :
                                                                isKing ? `https://cdn.discordapp.com/emojis/940345051182145596.gif?size=96&quality=lossless` :
                                                                    isMember ? `https://cdn.discordapp.com/emojis/939989682333319248.webp?size=96&quality=lossless` :
                                                                        `https://cdn.discordapp.com/attachments/951219313837240360/952833810494545950/898445404272721920.gif`
        })

        this.setColor(
            item[1].id == item[3].id ? `#f790f1` :
                isCreators ? `#f59f48` :
                    isManagers ? `#f790f1` :
                        isAdmin ? `#ff0909` :
                            isMod ? `#4365f8` :
                                isTrialMod ? `#43a847` :
                                    isSupport ? `#5865f2` :
                                        isHelpers ? `#ffca0d` :
                                            isTranslators ? `#7ca4ff` :
                                                isEmojiReviewers ? `#ffc542` :
                                                    isPremium ? `#fba71b` :
                                                        isKing ? `#ec4a56` :
                                                            isYoutuber ? `#cb1b20` :
                                                                isKing ? `#eb4a57` :
                                                                    isMember ? `#c297ec` :
                                                                        `WHITE`
        );
        this.setFooter({ text: `@${item[0].tag}`, iconURL: item[0].avatarURL({ dynamic: true }) })
        this.setTimestamp();

    }
};