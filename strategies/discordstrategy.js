const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../src/database/geral/User')
const { Client } = require('discord.js')
const client = new Client({ intents: 32767 })
const axios = require('axios');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    const user = await DiscordUser.findById(id);
    if (user)
        done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'guilds']
}, async function (accessToken, refreshToken, profile, done) {

    /*let arrayGuilds = profile.guilds
    if (!arrayGuilds.includes(process.env.SUPPORT)) {
        await axios({
            method: 'PUT',
            url: `https://discord.com/api/guilds/${process.env.SUPPORT}/members/${profile.id}`,
            headers: {
                'Authorization': `Bot ${process.env.TOKEN}`,
                'Content-type': 'application/json'
            },
            data: {
                'access_token': `${accessToken}`
            }
        }).then().catch(() => { console.log("usuário já está no servidor"); })
    }*/

    const user = await DiscordUser.findById({ _id: profile.id });
    if (user) user.delete();

    try {
        setTimeout(async () => {
            const newUser = await DiscordUser.create({
                _id: profile.id,
                username: profile.username,
                "website": {
                    email: profile.email,
                    locale: profile.locale,
                    mfa: profile.mfa_enabled,
                    guilds: profile.guilds
                },
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }, 700)
    } catch (e) {
        console.log("usuário já está na db")
        done(e, null);
    }
}));