module.exports = (client, message, playlist) => {

    message.channel.send(`${client.emotes.music} - ${playlist.title} đã được em thêm vào với (**${playlist.items.length}** bài hát) !`);

};