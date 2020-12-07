module.exports = (client, message, query) => {

    message.channel.send(`${client.emotes.error} - Khó quá. Em không tìm thấy gì về ${query} !`);

};