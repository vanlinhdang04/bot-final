module.exports = (client, message, queue, track) => {

    message.channel.send(`${client.emotes.music} - ${track.title} được em thêm tý phát cho nghe.`);

};