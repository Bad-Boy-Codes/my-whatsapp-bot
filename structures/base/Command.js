const { parse } = require("path")
// { Boolify } = Functions;
module.exports = async (command, { directory }) => {
    let Command = Object.assign(
        {
            execute() {
                return console.error(
                    `Command ${Command.name} doesn't have a default run method.`
                );
            },
            directory
        },
        command
    );

    Command.name = command?.name ?? parse(directory)?.name;
    Command.description =// Functions.capitalize(
        command?.description ?? "There is no description for Command command."
    // );
    Command.usage = command?.usage ?? [`{prefix}${Command.name}`];
    Command.aliases = command?.aliases ?? new Array();
    Command.examples = command?.examples ?? [`{prefix}${Command.name}`];
    Command.category =
        command?.category ?? parse(directory)?.dir.split("/").pop();
    Command.args = command?.args ?? new Array();
    Command.cooldown = Number(command?.cooldown ?? 1);
    // Command.disabled = {
    //     command: Boolify(command.disabled?.command, { isNull: false }),
    //     interaction: Boolify(command.disabled?.interaction, { isNull: true }),
    //     guild: Boolify(command.disabled?.guild, { isNull: true })
    // };
    return Command;
};