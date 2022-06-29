module.exports = {
    Client: require("./base/Client"),
    Command: require("./base/Command"),
    Event: require("./base/Event")
};

process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
    console.log(type, promise, reason);
});