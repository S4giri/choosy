const { Client } = require('discord.js')

const { readdirSync } = require('fs')
const { join } = require('path')

const { connect } = require('mongoose')
const Models = require('../database/Models.js')
const Locale = require("../../lib");
const Guild = require("../database/geral/Guild");

require("moment-duration-format");
require('../updates/rankings/ameis');

module.exports = class extends Client {
  constructor(options) {
    super(options)

    this.commands = []
    this.loadCommands()
    this.loadEvents()
  }

  updateCommands() {
    //for (let i = 0; i < this.guilds.cache.size; i++) {
    this.application.commands.set(this.commands);//, this.guilds.cache.map((g) => `${g.id}`)[i]);//.catch(() => { return; });
    //}
  }

  deleteCommands() {
    for (let i = 0; i < this.guilds.cache.size; i++) {
      this.application.commands.set([], this.guilds.cache.map((g) => `${g.id}`)[i]);//.catch(() => { return; });
    }
  }

  newGuildCommands(guild) {
    setTimeout(async () => {
      await this.application.commands.set(this.commands, guild.id);//.catch(() => { return; });
    })
  }

  async loadCommands(path = 'src/commands') {
    const categories = readdirSync(path)

    for (const category of categories) {
      const commands = readdirSync(`${path}/${category}`)

      for (const command of commands) {
        const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
        const cmd = new (commandClass)(this)

        this.commands.push(cmd)
      }
    }
  }

  logServerCreation(interaction, USER_DB) {
    const server = this.guilds.cache.get(process.env.SUPPORT)
    const channel = server.channels.cache.get("1001966735555039353")

    channel.send(`**${interaction.user.username}** criou um servidor, template '\`${USER_DB.templates[0].theme}\`' feito por  **\`${USER_DB.by}\`**`)
  }

  logTemplate(interaction) {
    const server = this.guilds.cache.get(process.env.SUPPORT)
    const channel = server.channels.cache.get("1001966795059642589")

    channel.send(`**${interaction.user.username}** enviou um template para avaliação.\n\nCanais: ${interaction.guild.channels.cache.size} - Cargos: ${interaction.guild.roles.cache.size} - Emojis: ${interaction.guild.emojis.cache.size}`)
  }

  loadEvents(path = 'src/events') {
    const categories = readdirSync(path)

    for (const category of categories) {
      const events = readdirSync(`${path}/${category}`)

      for (const event of events) {
        const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
        const evt = new (eventClass)(this)

        this.on(evt.name, evt.run)
      }
    }
  }


  async getLanguage(firstGuild) {
    if (!firstGuild) return;
    const guild = await Guild.findOne({
      _id: !isNaN(firstGuild) ? firstGuild : firstGuild.id,
    });

    if (guild) {
      let lang = guild.lang;

      if (lang === undefined) {
        guild.lang = "pt-BR";
        guild.save();

        return "pt-BR";
      } else {
        return lang;
      }
    } else {
      //await Guild.create({ _id: firstGuild.id });
      return "pt-BR";
    }
  }

  async getActualLocale() {
    return this.t;
  }

  async setActualLocale(locale) {
    this.t = locale;
  }

  async getTranslate(guild) {
    const language = await this.getLanguage(guild);

    const translate = new Locale("src/languages");

    const t = await translate.init({
      returnUndefined: false,
    });

    translate.setLang(language);

    return t;
  }

  async connectToDatabase() {
    const connection = await connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Database conectada com sucesso!')

    this.db = { connection, ...Models }
  }

}