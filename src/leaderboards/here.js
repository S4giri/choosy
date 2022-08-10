const { Client } = require('discord.js')

module.exports = class extends Client {
  constructor(options) {
    super(options)
  }

  static async db_randomMembers(random, membersRandom) {
    for (const member of random) {
      const doc = await this.client.db.users.findOne({ _id: member.id });
      console.log(doc)

      membersRandom.push({
        user: await this.client.users.fetch(member).then((user) => { return user; }),
        random: doc.misc.last_seen,
      });


    }
  }

  static sonhos(interaction) {
    return interaction.reply(`[RANK SONHOS] Sucesso.`);
  }

  static div(interaction) {
    return interaction.reply(`[RANK DIVULGADORES] Sucesso.`);
  }

};
