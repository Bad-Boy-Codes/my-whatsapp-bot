module.exports = {
    async run(message) {

        if (!message.body.toLowerCase.startsWith(Client.prefix)) return;
        let args = message.body.slice(Client.prefix.length).trim().split(/ +/g);

        let command = args.shift().toLowerCase(),
            cmd = Client.commands.search(command);

        if (cmd) {
            cmd.execute(message, args)
        }
    }
}