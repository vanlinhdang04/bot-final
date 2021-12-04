const fs = require('fs');
const discord = require('discord.js');
const axios = require('axios');

const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');
const { search } = require('ffmpeg-static');

var lucky = 0;
var profile = new Array();
var day = new Date();
var users = new Array();

const player = new Player(client);
client.player = player;
client.config = require('./config/bot.json');
client.emotes = require('./config/emojis.json');
client.filters = require('./config/filters.json');
loikhuyen = require('./loikhuyen.json');
cfs = require('./cfs.json');
var temp_loikhuyen = loikhuyen;
client.commands = new discord.Collection();

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir('./player-events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./player-events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading player event ${eventName}`);
        client.player.on(eventName, event.bind(null, client));
    });
});

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});

function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}
function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

client.on('message', async msg => {
    //if (msg.author.bot) return;
    var content = msg.content.slice(1);
    console.log(content);
    msg.reply(content);
//     await axios.get("https://api.simsimi.net/v2/?text="+content+"&lc=vn&cf=false")
//               .then(function (response) {
//         msg.reply(response.success);
//     }) .catch(function (error) {
//         console.log(error);
//         msg.reply("Lỗi rùi");
//     })
    
    if (msg.content.startsWith(client.config.prefix)) {
        const args = msg.content.slice(client.config.prefix.length).split(/ +/);
        const command = args[0].toLowerCase();
        console.log(command);

        if (command === 'loikhuyen') {
            lucky = lucky + 1;
            console.log("Đang có " + temp_loikhuyen.loikhuyen.length + " lời khuyên");
            if( temp_loikhuyen.loikhuyen.length == 0 ){
                msg.channel.send("Hết lời khuyên mới rồi. Cập nhật đi anh Linh.");
                temp_loikhuyen.loikhuyen = loikhuyen.loikhuyen;
            }
            var rand = Math.floor(Math.random() * temp_loikhuyen.loikhuyen.length);

            msg.reply(temp_loikhuyen.loikhuyen[rand]);
            console.log( "Chọn lời khuyên thứ " +rand);
            temp_loikhuyen.loikhuyen.splice(rand,1);
            console.log( "Xóa lời khuyên thứ " +rand);
            console.log("Còn "+temp_loikhuyen.loikhuyen.length +" lời khuyên");

            if ( profile[msg.member.id] == undefined ){
                profile[msg.member.id] = {
                    "name" : msg.member.displayName,
                    "count" : 1,
                    "lastDate" : new Date(),
                    "createDay" : new Date()
                }
                users.push(profile[msg.member.id]);
                //console.log(new Date().toLocaleString("en-US", {timeZone: "America/New_York"})); // hiển thị thời gian
                console.log("Tạo thành công profile cho "+ msg.member.displayName);
            }
            else{
                var today = new Date();
                var diff = new Date( today.getTime() - profile[msg.member.id].lastDate.getTime());
                console.log(diff.getUTCFullYear() - 1970, diff.getUTCMonth(), diff.getUTCDate() - 1);
                if ( diff.getUTCDate() - 1 > 1 || diff.getUTCMonth() != 0 || diff.getUTCFullYear() - 1970 != 0){
                    msg.reply("Bạn đã không cần lời khuyên trong " + diff.getUTCDate() - 1 + " ngày " + diff.getUTCMonth() + " tháng, có chuyện gì với bạn sao ?");
                }
                profile[msg.member.id].name = msg.member.displayName;
                profile[msg.member.id].count += 1;
                profile[msg.member.id].lastDate = new Date();
            }
            
            //console.log(profile[msg.member.id]);

            
        }

        if (command === 'check') {
            var noidung = msg.content.slice(7).replace(/[^a-z0-9\s]/gi, '');
            console.log(profile[noidung]);
            if (profile[noidung] === undefined){
                msg.channel.send("Người dùng này chưa tham gia dịch vụ.");
                return;
            }
            var today = new Date();
            var diff = new Date( today.getTime() - profile[msg.member.id].createDay.getTime());


            msg.channel.send(
                "Tham gia từ "+ profile[noidung].createDay.toLocaleString("en-US", {timeZone: "America/New_York"}) + " đến hiện tại" +
                "\nTên : " + profile[noidung].name +
                "\n Số lần nhận lời khuyên : " + profile[noidung].count +
                "\n Lần cuối nhận lời khuyên : " + profile[noidung].lastDate.toLocaleString("en-US", {timeZone: "America/New_York"}) +
                "\n Trung bình nhận "+ Math.abs(profile[noidung].count / diff.getUTCDate()) +" lời khuyên/ngày"
            );
        }

        if (command === 'reply') {
            var noidung = msg.content.slice(7).toLowerCase();
            var traloi = new Array();
            var nd = xoa_dau(noidung);
            //noidung = xoa_dau(noidung);
            if(nd.indexOf("giup toi") != -1 || nd.indexOf("xin chao") != -1 || nd.indexOf("chao") != -1 || nd.indexOf("tra loi") != -1){
                traloi.push("Xin chào, tôi có thể giúp bạn vài câu hỏi đơn giản.:blush:");
            }
            if( nd.indexOf("hay") != -1 ) {
                if( nd.indexOf("nen") != -1 ){
                    var vt1 = nd.indexOf("nen");
                    var vt2 = nd.lastIndexOf("hay");
                    traloi.push(noidung.slice(vt1 + 3,vt2));
                    traloi.push(noidung.slice(vt2 + 3));
                    //msg.reply(traloi[Math.floor(Math.random() * traloi.length)]);
                }
                var vt1 = xoa_dau(noidung).lastIndexOf("hay");
                traloi.push(noidung.substring(vt1 , 0));
                traloi.push(noidung.slice(vt1 + 3));  
            }
            if( nd.indexOf("hay") == -1 && nd.indexOf("nen") != -1 ) {
                var vt1 = nd.indexOf("nen");
                var vt2 = (nd.indexOf("khong") != -1)?nd.indexOf("khong"):nd.length;
                //console.log(vt2);
                traloi.push(noidung.substring(vt1 , vt2));
                traloi.push("mình nghĩ là không nên đâu.");
            }
            if ( nd.indexOf("co") != -1 ){
                var vt1 = nd.indexOf("co");
                var vt2 = (nd.indexOf("khong") != -1)?nd.indexOf("khong"):nd.length;
                //console.log(vt2);
                traloi.push(noidung.substring(vt1 , vt2));
                traloi.push("không có nha.");
                traloi.push("chắc có thể chứ mình không chắc. :relaxed:");
                traloi.push("có là cái chắc rồi :smile:")
            }
            if ( nd.indexOf("that khong") != -1){
                traloi.push("thật đấy bạn ạ.");
                traloi.push("không nên quá tin những lời đồn từ bên ngoài.");
            }
            if ( nd.indexOf("chac") != -1){
                traloi.push("không chắc chắn lắm.");
                traloi.push("chắc chắn luôn nha.");
                traloi.push("không phải như bạn nghĩ đâu");
            }
            if (nd.indexOf("toi") != -1 && nd.indexOf("nha") != -1){
                traloi.push("ok bạn nè.");
                traloi.push("nghe được đấy.");
                traloi.push("thôi đừng");
            }
            if (nd.indexOf("nha") != -1){
                traloi.push("ok bạn nè.");
                traloi.push("nghe được đấy.");
                traloi.push("thôi đừng");
                traloi.push("được luôn bạn");
            }
            if (nd.indexOf("ngu ngon") != -1 || nd.indexOf("ngu ngoan") != -1){
                traloi.push("chúc bạn ngủ ngon nha.:kissing_heart:");
                traloi.push("mơ đẹp nha. :sleeping:")
            }
            if( nd.indexOf("dm") != -1 || nd.indexOf("dcm") != -1 || nd.indexOf("clm") != -1 || nd.indexOf("vl") != -1 || nd.indexOf("vcl") != -1 ) {
                traloi.push("hãy đặt câu hỏi lịch sự đi ạ :pleading_face:");
                traloi.push("tôn trọng người khác trước khi muốn được người khác tôn trọng :angry:");
                traloi.push("trong câu hỏi của bạn có những từ không lành mạnh nên mình xin phép không trả lời");
            }
            if (nd.indexOf("duoc khong") != -1){
                var vt2 = nd.indexOf("duoc khong");
                var vt1 = (nd.indexOf("toi") != -1 )?nd.indexOf("toi")+3:0;
                traloi.push(noidung.slice(vt1,vt2) + "được nha.");
                traloi.push(noidung.slice(vt1,vt2) + "không được nha.");
                //traloi.push("không được, "+noidung.slice(0))
                traloi.push("được luôn bạn.Mình ủng hộ.");
                traloi.push("không được như vậy nha");
                traloi.push("được thì được đấy nhưng cẩn thận");
            }
            // if (nd.indexOf("duoc chua") != -1){
                
            //     var vt2 = nd.indexOf("duoc chua");
            //     console.log(vt1,vt2);
            //     var vt1 = (nd.indexOf("toi") != -1 )?nd.indexOf("toi")+3:0;
            //     traloi.push(noidung.slice(vt1,vt2) + "được nha.");
            //     traloi.push(noidung.slice(vt1,vt2) + "chưa được nha.");
            //     //traloi.push("không được, "+noidung.slice(0))
            //     traloi.push("được luôn bạn.Mình ủng hộ.");
            //     traloi.push("chưa phải lúc đâu.");
            //     traloi.push("được thì được đấy nhưng cẩn thận");
            // }
            if( traloi.length == 0 ){
                
                if (nd.indexOf("khong") > nd.length-6){
                    traloi.push("không đâu bạn");
                    traloi.push("mình nghĩ là có.");
                    traloi.push("có hay không thì mình không biết.");
                }
                else{
                    traloi.push("hãy tin vào quyết định của bản thân");
                    traloi.push("cái này mình không giúp được. Bạn cứ thử làm điều bạn thích xem sao.");
                    traloi.push("mình chỉ đưa ra ý kiến khách quan thôi còn mọi chuyện vẫn phải do bạn tự quyết định đấy.");
                    traloi.push("mình không giúp được gì rồi. Hỏi Văn Linh thử xem.");
                }
                
            }
            msg.reply(traloi[Math.floor(Math.random() * traloi.length)]);
        }
        
        if (command === 'addloinhan') {
            const noidung = msg.content.slice(12);
            //console.log(noidung);
            cfs.cfs.push(noidung);
            msg.reply(`${client.emotes.success} Cám ơn bạn đã thêm lời nhắn.`);
            console.log(cfs.cfs.length);
            console.log(noidung);
        }
        if(command === 'loinhan') {
            if( cfs.cfs.length > 0){
                var nd = Math.floor(Math.random() * cfs.cfs.length);
                msg.channel.send(`${client.emotes.cfs[Math.floor(Math.random() * client.emotes.cfs.length)]} ${cfs.cfs[nd]}`);
                cfs.cfs.splice(nd,1);
            }
            else {
                msg.channel.send(`:disappointed: Hiện không có ai để lại lời nhắn.`);
            }
            
        }

    }
})


client.login(process.env.BOT_TOKEN);
//client.login("");
