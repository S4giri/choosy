require('dotenv').config()

const Client = require('./src/structures/Client')
const client = new Client({ intents: 32767 })

const moment = require('moment')
var express = require("express");
var app = express();
const PORT = process.env.PORT || 80
const session = require('express-session');
const passport = require('passport')

const discordStrategy = require('./strategies/discordstrategy', { bot: client });
const path = require('path')

// Routes
const authRoute = require('./routes/auth');
const req = require('express/lib/request');

app.use(session({
  secret: 'some random secret',
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false,
  name: 'discord.oauth2'
}))

app.set('view engine', "ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// MiddLeware Routes
app.use('/auth', authRoute);

function isAuthorized(req, res, next) {
  if (req.user) {
    next();
  }
  else {
    res.redirect('/auth/redirect')
  }
}
app.get('/dashboard', isAuthorized, async function (req, res) {
  res.render('dashboard', { user: req.user, bot: client });
});

app.get("/dashboard/guilds", isAuthorized, async function (req, res) {
  res.render("../views/dashboard/guilds", { user: req.user, bot: client })
});

app.get('/dashboard/settings', isAuthorized, async function (req, res) {
  res.send(200);
})

app.get("/", async function (req, res) {
  res.render("index", {
    bot: client,
    user: req.user,
    moment: moment
  })
});

app.get("/status", async function (req, res) {
  const SHARDING = await client.shard.broadcastEval(clientGG => [clientGG.shard.ids, clientGG.ws.status, clientGG.ws.ping, clientGG.guilds.cache.size, clientGG.users.cache.size, clientGG.readyAt]).then(results => results.map(data => data))
  res.render("../views/status", {
    bot: client,
    user: req.user,
    moment: moment,
    SHARD_DATA: SHARDING[0]
  })
});

app.get("/team", async function (req, res) {
  const CLUBE = client.guilds.cache.get(process.env.SUPPORT);
  const ROLE = CLUBE.roles.cache.get("954868477460619304");
  let B = [];
  for (let i = 0; i < ROLE.members.size; i++) {
    B.push(await client.api.users(client.users.cache.get(ROLE.members.map((mm) =>
      mm.user.id)[i]).id).get(""));
  }

  await res.render("../views/team", {
    bot: client,
    user: req.user,
    moment: moment,
    user_data: B
  });
});

app.get('*', (req, res) => {
  res.render('../views/404', {
    bot: client,
    user: req.user
  });
});

app.listen(process.env.PORT, () => {
  console.log("Dashboard ligada: http://localhost:" + PORT)
})

client.login(process.env.TOKEN);