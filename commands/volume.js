exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Vào phòng em mới phát nhạc cho nghe được !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Hiện tại không có bài hát nào được phát !`);

    if (!args[0]) return message.channel.send(`${client.emotes.error} - Hãy nhập mức âm lượng từ 1 đến 100 ạ !`);

    if (isNaN(args[0]) || 100 < args[0] || args[0] <= 0) return message.channel.send(`${client.emotes.error} - Hãy nhập mức âm lượng từ 1 đến 100 ạ !`);

    if (message.content.includes('-') || message.content.includes('+') || message.content.includes(',') || message.content.includes('.')) return message.channel.send(`${client.emotes.error} - Please enter a valid number !`);

    client.player.setVolume(message, parseInt(args[0]));

    message.channel.send(`${client.emotes.success} - Âm lượng : **${args.join(" ")}%** !`);

};
