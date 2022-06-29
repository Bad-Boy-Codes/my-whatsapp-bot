
const { MessageMedia } = require('whatsapp-web.js');
module.exports = {
    name: "sticker", description: "changes images into stickers",
    aliases: ["st"],
    usage: "{prefix}sticker",
    async execute(msg) {
        let quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.hasMedia) {
            let attachmentData = await quotedMsg.downloadMedia();
            await Client.sendMessage(msg.to, new MessageMedia(attachmentData.mimetype, attachmentData.data, attachmentData.filename), { sendMediaAsSticker: true });
        } else {
            await Client.sendMessage(msg.to, `🙇‍♂️ *Error*\n\n` + "```No image found to make a Sticker```");
        }

    }
}