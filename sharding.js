const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./choosy.status.js", {
    token: "OTk5MjEwNTk3MTcyMzk2MDQy.GdkTbF.aaW7Ie3jJW162nYu1F9_SxLSlKiLWzNdCLE8Ss",
    totalShards: "auto",
    respawn: true
});

manager.on("shardCreate", (shard) => {
    console.log(`Shard #${shard.id + 1} voando alto!`)

    shard.on("death", (shard) => console.log(`Queda no shard #${shard.id + 1}`));

    shard.on("disconnect", (event) => {
        console.warn("Shard " + shard.id + 1 + " disconnected. Dumping socket close event...");
        console.log(event);
    });

})

manager.spawn();