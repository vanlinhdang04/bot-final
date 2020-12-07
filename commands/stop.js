exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Vào phòng em mới phát nhạc cho nghe được !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Hiện tại không có bài hát nào được phát !`);

    client.player.setRepeatMode(message, false);
    client.player.stop(message);

    message.channel.send(`${client.emotes.success} - Đến lúc nghỉ ngơi rồi. Cám ơn mọi người đã cùng nghe nhạc !`);

};
