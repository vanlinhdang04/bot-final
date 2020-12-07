exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Vào phòng em mới phát nhạc cho nghe được !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Hiện tại không có bài hát nào được phát !`);

    client.player.resume(message);

    message.channel.send(`${client.emotes.success} - Bài hát ${client.player.getQueue(message).playing.title} **resumed**. Chúc mọi người nghe nhạc vui vẻ !`);

};
