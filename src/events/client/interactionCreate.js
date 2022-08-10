const Event = require('../../structures/Event')
const wait = require('../../converting/timestamp/setTimeout')
const Emotes = require('../../utils/Emotes')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: 'interactionCreate'
    })
  }

  run = async (interaction) => {

    if (interaction.isCommand()) {

      if (!interaction.guild) return
      const KANNA = await this.client.db.kanna.findById({ _id: this.client.user.id });
      if (!KANNA) await this.client.db.kanna.create({ _id: this.client.user.id, maintenance: { status: false, reason: null } });

      var t = await this.client.getTranslate(interaction.guild.id);

      const cmd = this.client.commands.find(c => c.name === interaction.commandName)
      const user = interaction.options.getUser('usuário') || interaction.user
      const server = interaction.options.getString('servidor')

      const DATABASEK = await this.client.db.users.findById({ _id: user.id })

      if (!DATABASEK && !user.bot) await this.client.db.users.create({ _id: user.id, username: user.username })

      interaction.server = this.client.guilds.cache.get(server) || interaction.guild
      interaction.mention = user
      interaction.bot = this.client.user
      interaction.guild.db = await this.client.db.guilds.findById({ _id: interaction.guild.id }) || await this.client.db.guilds.create({ _id: interaction.guild.id, "network.channel": { id: null }, "network.msg": [], "network.premium": { has: false, since: null, type: 'none' } })
      interaction.network = await interaction.guild.db.network

      if (cmd) {
        if (cmd.database && !user.bot) {
          interaction.author = await this.client.db.users.findById({ _id: interaction.user.id }) || await this.client.db.users.create({ _id: interaction.user.id, username: interaction.user.username })
          interaction.user.db = await this.client.db.users.findById({ _id: user.id }) || await this.client.db.users.create({ _id: user.id, username: user.username })
          interaction.user.templates = await this.client.db.templates.findById({ _id: user.id }) || await this.client.db.templates.create({ _id: user.id, by: interaction.user.tag })
          interaction.user.centrals = await this.client.db.centrals.findById({ _id: user.id }) || await this.client.db.centrals.create({ _id: user.id })
        }

        let userPermission = cmd.uPermissions
        let clientPermission = cmd.cPermissions
        if (userPermission !== undefined) {
          if (!interaction.member.permissions.has(userPermission)) {
            let perm = userPermission.map(value => t(`permissions:${value}`)).join(", ")

            let embedUserPerm = new MessageEmbed()
              .setAuthor({ name: `${interaction.user.username} - Permissão insuficiente`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
              .setDescription(t("permissions:USER_MISSING_PERMISSION", { perm: perm }))
              .setColor("#BE1100")

            return interaction.reply({ embeds: [embedUserPerm], ephemeral: true })

          }
        }
        if (clientPermission !== undefined) {
          if (!interaction.guild.me.permissions.has(clientPermission) || !interaction.channel.permissionsFor(this.client.user.id).has(clientPermission)) {
            let perm = clientPermission.map(value => t(`permissions:${value}`)).join(", ")
            return interaction.reply({ content: `${t("permissions:CLIENT_MISSING_PERMISSION", { perm: perm })}`, ephemeral: true })
          }
        }

        const USER_w = await this.client.db.users.findById({ _id: interaction.user.id })

        if (!USER_w || !USER_w.misc.isOwner && !user.bot) {
          if (KANNA.maintenance.status) return interaction.reply(`<a:bell_gif:863580628992393247> ${interaction.user}, **ALERTA**!\nPor ora todos meus comandos foram desativados!\n\n<:news:872891933712846908> **MOTIVO**:\n${KANNA.maintenance.reason}\n\n<:invite:872907005197697084> Acompanhe a manutenção:\n- https://discord.gg/edxWH28JHK`, { ephemeral: true });
          if (interaction.user.db?.blacklist.stats || false) return interaction.reply({ content: `Você quebrou as regras e foi banido da **${this.client.user.username}**, baka!` })
          if (cmd.dev) return interaction.reply({ content: "Função em desenvolvimento." })
          if (cmd.disabled) return interaction.reply({ content: "Por ora esse comando está desativado.", ephemeral: true })
          if (cmd.maintenance) return interaction.reply({ content: `${t("events.title.alert", { author: interaction.user, bell: Emotes.bell })}\n${t("events:misc.maintenance")} [${t("events:links.follow")}](https://discord.gg/${process.env.CODE})`, ephemeral: true })
          if (cmd.creators) return interaction.reply({ content: "Apenas meus criadores podem utilizar esse comando.", ephemeral: true })
          if (cmd.admin) return interaction.reply({ content: "Apenas meus administradores podem utilizar esse comando.", ephemeral: true })
          if (cmd.bTester) return interaction.reply({ content: "Apenas meus Beta Testers podem utilizar esse comando.", ephemeral: true })
          if (cmd.uPremium) return interaction.reply({ content: "Apenas usuários Premium podem executar esse comando.", ephemeral: true })
          if (cmd.gPremium) return interaction.reply({ content: "Apenas servidores Premium tem acesso a esse comando.", ephemeral: true })
          if (cmd.posse) return interaction.reply({ content: `Apenas a posse do servidor (<:server_owner:950612764920000552> **${this.client.users.cache.get(interaction.guild.ownerId).username}**) pode utilizar esse comando.`, ephemeral: true })
        }

        const CANAL_CMD_LOGS = await this.client.channels.cache.get("996764593370181745")

        /*if(interaction.network.stats == false) {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: `O sistema está desativado, peça para um administrador ativá-lo usando \`/network stats\`.`, ephemeral: true }).catch(() => {return;})
          } else {
          if(cmd.name == "network" && interaction.options._subcommand.toLowerCase() != "stats") {
          return interaction.reply({ content: `O sistema está desativado para evitar exibir links de outros servidores em seu servidor, caso queira fazer parte da Network ative-a usando \`/network stats\`, configure o canal em \`/network config\` após isso use \`/bump\`.`, ephemeral: true }).catch(() => {return;})
          } else {
            cmd.run({ interaction, wait }, t);
          }
          }
        }*/

        cmd.run({ interaction, Emotes, wait }, t);

        process.on('unhandledRejection', e => {
          const SV = this.client.guilds.cache.get(process.env.SUPPORT)
          const CH_L = SV.channels.cache.get("1002593696400801832")

          CH_L.send(`**${interaction.user.tag}** (\`${interaction.user.id}\`) encontrou uma falha no comando \`/${cmd.name}\`.\n\n\`\`\`js\n${e}\n\`\`\``)

          interaction.reply({ content: `${Emotes.bug} Ops.. mas que saia justa.\nO comando \`${interaction.commandName}\` parou de funcionar. ${Emotes.cry}\n\n${Emotes.xmark} **ERRO**: \`\`\`js\n${e}\n\`\`\`\n${Emotes.report} **OBS**: Falha reportada para os meus criadores.`, ephemeral: true });
        });

        //CANAL_CMD_LOGS.send(`<:data:952923388752588801> **${interaction.user.username}** usou \`/${cmd.name}\``)

      }

    }
  }
}