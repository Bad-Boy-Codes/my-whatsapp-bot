const Structures = require("./structures");

Object.defineProperty(Object.prototype, "Client", {
    value: new Structures.Client()
});

Client.connect();
