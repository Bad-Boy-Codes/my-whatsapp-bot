const { inspect } = require('util');
module.exports = {
    name: "eval", description: "Evaluates code",
    aliases: ["ev"],
    usage: "{prefix}eval [code]",
    examples: [
        "{prefix}eval lol",
    ],
    async execute(message, args) {

        let evaled;
        try {
            evaled = await eval(args.join(' '));
            message.reply(inspect(evaled));
        }
        catch (error) {
            console.error(error);
            message.reply('there was an error during evaluation.');
        }

    }
}