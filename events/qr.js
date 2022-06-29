module.exports = {
    async run(qr) {
        require('qrcode-terminal').generate(qr, { small: true });
    }
}