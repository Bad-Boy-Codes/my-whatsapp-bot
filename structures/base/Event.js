const { sep, parse } = require("path");
module.exports = (event, data) => {
    let Event = Object.assign(
        {
            async execute(event, ...args) {
                let exc = Client.events.get(event);
                if (!exc) return;
                return exc.run(...args);
            },

            async run() {
                return console.log(Event.name + " event doesn't have any execution");
            }
        },
        event
    );

    const dirname = parse(data.directory).dir,
        category = dirname.split(sep)[parseInt(dirname.split(sep).length - 1, 10)];
    Event.directory = data?.directory;
    Event.category = category !== "events" ? category : null;
    Event.name = event?.name ?? parse(data.directory)?.name;
    // Event.type = Functions.Boolify(event?.once, {
    //     isNull: "on",
    //     isTrue: "once",
    //     isFalse: "on"
    // });
    // Event.emitter =
    //     (typeof event.emitter === "string"
    //         ? Event.client[event.emitter]
    //         : event.emitter) || Client;
    return Event;
};