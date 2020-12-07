module.exports = (client, message, track) => {

    message.channel.send(`${client.emotes.music} - Em phát bài ${track.title} into ${message.member.voice.channel.name} nè`);

};