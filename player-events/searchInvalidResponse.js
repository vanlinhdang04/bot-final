module.exports = (client, message, query, tracks, content, collector) => {

    message.channel.send(`${client.emotes.error} - Chọn một số từ **1** and **${tracks.length}** đi ạ. Em phát được hết !`);

};