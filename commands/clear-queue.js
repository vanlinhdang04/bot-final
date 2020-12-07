exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Vào phòng em mới phát nhạc cho nghe được !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Hiện tại không có bài hát nào được phát !`);

    client.player.clearQueue(message);

    message.channel.send(`${client.emotes.success} - Các bài hát đã được xóa khỏi danh sách. Hãy bắt đầu với danh sách mới nào !`);

};
