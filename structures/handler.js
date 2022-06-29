let { sync } = require("glob"),
    { resolve } = require("path"),
    { Command, Event } = require("./index");

module.exports = {
    async events(callback) {
        let startedAt = Date.now();
        await sync(resolve("./events/*.js")).forEach(async (directory) => {
            let File = require(directory);
            if (!Array.isArray(File)) File = [File];
            for (let i in File) {
                const event = await Event(File[i], {
                    directory
                });
                Client.events.set(event.name, event);
                event.emitter[event.type](event.name, (...args) =>
                    event.execute(event.name, ...args)
                );
            }
        });
       // await callback();
        console.log(
            "Handler",
            "Loaded Events",
            Client.events.size +
            // Functions.ms(
            Date.now() - startedAt
            //)
        );
    },

    async commands(callback) {
        let commands = sync(resolve("./commands/**/*.js")),
            startedAt = Date.now();

        for await (const directory of commands) {
            let File = require(directory);

            if (!Array.isArray(File)) File = [File];
            for (let i in File) {
                const command = await Command(File[i], {
                    directory
                });
                await Client.commands.set(command.name.toLowerCase(), command);
            }
        }
        //await callback();
        console.log(
            "Handler",
            "Loaded Commands",
            Client.commands.size //+
            //Chalk.customs.w(" in ") +
            // Functions.ms(Date.now() - startedAt)
        );
    }
}