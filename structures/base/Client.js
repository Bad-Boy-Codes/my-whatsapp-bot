const { Client, LocalAuth } = require('whatsapp-web.js')
module.exports = class WebClient extends Client {
    constructor(props = {}) {
        props.authStrategy = new LocalAuth();
        super(props);
        this.handler = require("../handler");
        this.commands = new Map();
        this.commands.search = (cmds) => Client.commands.get(cmds) ||
            Client.commands.filter(
                (cmd) => cmd.aliases && cmd.aliases.includes(cmds)
            )[0];
        this.events = new Map();
        this.prefix = ".";
    }
    async connect() {
        this.handler.commands();
        this.handler.events();
        this.initialize();
    }
}