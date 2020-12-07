exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Vào phòng em mới phát nhạc cho nghe được !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Hiện tại không có bài hát nào được phát !`);

    client.player.pause(message);

    message.channel.send(`${client.emotes.success} - Bài  ${client.player.getQueue(message).playing.title} **paused**. Nghỉ xíu rồi nghe tiếp nha !`);

};
