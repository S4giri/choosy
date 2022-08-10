const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
    _id: { type: String, default: null },
    lang: { type: String, default: "pt-BR" },
    badges: { type: Array, default: [] },
    EarlyServer: { type: Boolean, default: false }, // Servidores que adicionaram antes da verificação (dar perfil/badge única)
    bump: {
        date: { type: Number, default: 0 },
        last: { type: String, default: null }
    },
    serverinfo: {
        desc: { type: String, default: null },
        tags: { type: Array, default: [] }
    },
    network: {
        stats: { type: Boolean, default: false },
        premium: {
            has: { type: Boolean, default: false },
            since: { type: String, default: null },
            type: { type: String, default: 'none' } // iron = Ficará 1 hr por dia destacado no topo, gold = Ficará 1 dia destacado no topo, diamond = Ficará 3 dias destacado no topo, obsidian = Ficará destacado no topo até que o prazo expire (1 mês), (Caso renovar mensalmente o pagamento ficará destacado pra sempre).
        },
        since: { type: String, default: null },
        channel: { 
            id: { type: String, default: null } 
        },
        msg: { type: Array, default: [] }
    },
    welcome: {
        channel: String
    }
})

module.exports = model('guilds', guildSchema)