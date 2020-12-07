exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Vào phòng em mới phát nhạc cho nghe được !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Hiện tại không có bài hát nào được phát !`);

    const repeatMode = client.player.getQueue(message).repeatMode;

    if (repeatMode) {
        client.player.setRepeatMode(message, false);
        return message.channel.send(`${client.emotes.success} - Trạng thái lặp lại danh sách nhạc đã đóng **disabled** !`);
    } else {
        client.player.setRepeatMode(message, true);
        return message.channel.send(`${client.emotes.success} - Trạng thái lặp lại danh sách nhạc đã bật **enabled** !`);
    };

};
