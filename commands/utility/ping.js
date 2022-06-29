module.exports = {
    name: "ping",
    aliases: ["pong"],
    async execute(message) {
        message.reply("pong!");
    }
};