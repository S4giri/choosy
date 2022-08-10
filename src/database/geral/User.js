const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    _id: { type: String, default: null },
    username: { type: String, default: null },
    blacklist: {
        stats: { type: Boolean, default: false }
    },
    website: {
        email: { type: String, default: null },
        locale: { type: String, default: null },
        mfa: { type: Boolean, default: false },
        guilds: { type: Array, default: [] },
    },
    love: {
        cutucar: {
            desativado: { type: Boolean, default: false },
            cutucou: { type: Number, default: 0 },
            cutucadas: { type: Number, default: 0 },
            historico: { type: Array, default: [] },
            tempo: { type: Number, default: 0 }
        },
        marry: {
            space: { type: Number, default: 5 },
            pendente: {
                status: { type: Boolean, default: false },
                user: { type: String, default: null },
            },
            historico: { type: Array, default: [] },
            users: { type: Array, default: [] },
            divorce: {
                historico: { type: Array, default: [] }
            }
        }
    },
    misc: {
        profile: {
            aboutme: { type: String, default: null },
            background: { type: Array, default: [] },
            minecraft: { type: String, default: null }
        },
        gostei: {
            avatar: {
                total: { type: Number, default: 0 },
                lastUser: { type: String, default: null },
                lastTime: { type: String, default: null },
                list: { type: Array, default: [] },
                likedUsers: { type: Array, default: [] },
            }
        },
        badges: { type: Array, default: [] },
        audioRequest: { type: String, default: null },
        historic: { type: Array, default: [] },
        sexuality: {
            gender: { type: String, default: null },
            sexual_option: { type: String, default: null },
            pronome: { type: String, default: null }
        },
        isOwner: { type: Boolean, default: false },
        lastUse: { type: Number, default: 0 },
        name_history: { type: Array, default: [] },
        last_seen: { type: Number, default: 0 },
        first_cmd_used: { type: Array, default: [] },
        Reps: {
            translacoes: { type: Array, default: [] },
            recebeu: { type: Number, default: 0 },
            enviou: { type: Number, default: 0 },
            time: { type: Number, default: 0 },
        },
        views: {
            monthly: { type: Number, default: 0 },
            total: { type: Number, default: 0 },
            lastView: { type: String, default: null },
            lastViewTimestamp: { type: Number, default: 0 }
        }
    }
})

module.exports = model('users', userSchema)