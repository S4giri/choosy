const rpc = require("discord-rpc")
const client = new rpc.Client({ transport: 'ipc' })
require("./app.js");

client.on('ready', () => {
  console.log("Status ligado.");
  client.request('SET_ACTIVITY', {
    pid: process.pid,
    activity: {
      details: "Um lugar pra você ficar de boa",
      assets: {
        large_image: "choosy",
        large_text: `Imagine um lugar onde você possa criar muitos amigos, compartilhar coisas, uma 'rede social' inovadora.`,
      },
      timestamps: {
        start: new Date().getTime()
      },
      buttons: [{ label: "Projeto em Desenvolvimento", url: "https://discord.gg/b2jQbYaKqx" }, { label: "Atendimento", url: "https://discord.gg/b2jQbYaKqx" }]
    }
  })
})
client.login({ clientId: "999210597172396042" }).catch(console.error);