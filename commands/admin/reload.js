module.exports = {
    name: "reload",
    aliases: [], description: "Reloads a command without restart",
    aliases: ["re"],
    usage: "{prefix}userinfo <file> [commandpath]",
    examples: [
        "{prefix}reload ping",
        "{prefix}reload new category/name name",
        "{prefix}reload delete name",
        "{prefix}reload event name"
    ],
    async execute(message) {
        let cmd =
            Client.commands.search(args[0]);
        if (!cmd) return message.reply("Cant find command");
        let { directory } = cmd;
        delete require.cache[require.resolve(directory)];

        let File = require(directory);

        if (!Array.isArray(File)) File = [File];
        for (let i in File) {
            const command = await Command(File[i], {
                directory
            });

            await Client.commands.delete(command.name);
            await Client.commands.set(command.name.toLowerCase(), command);
        }

        await message.reply('reloaded ;)');
    }
}