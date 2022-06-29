module.exports = {
    name: "help",
    aliases: ["halp"],
    description:
        "Get list of all command and even get to know every command detials",
    usage: "help <cmd>",
    category: "info",
    async execute(message, args) {
        return message.reply("not finished")
        if (args[0]) {
            const command = await Client.commands.get(args[0]);

            if (!command) {
                return message.channel.send("Unknown Command: " + args[0]);
            }

            let embed = new Discord.MessageEmbed().setAuthor(
                command.name,
                Client.user.displayAvatarURL()
            );
            if (command.aliases)
                embed.addField("Aliases", command.aliases.join(", "));
            if (command.cooldown) embed.addField("Cooldown", command.command);
            embed
                .addField("Description", command.description || "Not Provided :(")
                .addField("Usage", "`" + command.usage + "`" || "Not Provied")

                .setThumbnail(Client.user.displayAvatarURL())
                .setColor("GREEN")
                .setFooter(Client.user.username, Client.user.displayAvatarURL());

            return message.channel.send(embed);
        } else {
            const commands = await Client.commands;

            let emx = new Discord.MessageEmbed()
                .setAuthor(
                    Client.user.username + " Help",
                    Client.user.displayAvatarURL()
                )
                .setDescription(
                    `TYPE !help <cmd> for details (some may not have, maybe because description was not set)\n\nTotal Commands: ${Client.commands.size}`
                )
                .setColor("FF69B4")
                .setFooter(
                    message.author.username,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setThumbnail(Client.user.displayAvatarURL());

            let com = {};
            for (let comm of commands) {
                let category = comm.category || "Unknown";
                let name = comm.name;

                if (!com[category]) {
                    com[category] = [];
                }
                com[category].push(name);
            }

            for (const [key, value] of Object.entries(com)) {
                let category = key;

                let desc = "`" + value.join("`, `") + "`";

                emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
            }

            return message.channel.send(emx);
        }
    }
};