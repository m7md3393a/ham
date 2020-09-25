require("express")().listen(1343);

const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("NzQ5MjI5Mzc1ODI3ODY5NzQ2.X0o8Ow.ANoHjYU5EF7bWBEy10hzwh7xBf0");
const fetch = require("node-fetch");
const fs = require('fs')

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return;
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Başarıyla Pinglendi.")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`.uptime |  ${db.get("linkler").length} Bot ${client.guilds.size} Server`)
  console.log(`giris yaptı`)
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == ".uptime") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.reply("هذا المشروع بملفاتي بلفعل اذا بوتك مو شغال شوف لو فيلو ايرور")
    message.reply("Done uptimed your Project now 24/7  ");
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send("" + e)
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "++s") {
  var link = spl[1]
 message.channel.send(`${db.get("linkler").length} Bot/Proje Uptime Yapılıyor.!`)
}})
 

//Main Dosyasına Atın!
client.on('message', message => {
const moment = require("moment")
require("moment-duration-format")
if (message.content === "++ss") {
message.channel.send(`Bot Ping ** ${client.ping} ms**
Toplam Sunucu ${client.guilds.size}
Toplam Kullanıcılar ** ${client.users.size} **
Toplam kanal  ** ${client.channels.size} **
Uptime Süresi  ** ${moment.duration(client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]')} **
`) //furkan kaçer tarafından yazıldı iyi kullanımlar hata alırsanız sunucuma gelin https://discord.gg/6xucPH3
}});
 


const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "++help") {
let embed = new Discord.RichEmbed()
.setColor('#4ca74c')
.addField(`Uptime Bot v1.0 Yardım`, `Bot glitch sitelerinin 7/24 açık kalmasını sağlayan bir sistem içerir. Sistemdeki bağlantılar bakım gerektirmeden 7/24 çalışır.`)
.addField(`Genel Komutlar`,`

\`!yardım\` - Yardım menüsünü gösterir.
\`!ekle\` - Belirttiğiniz bağlantıyı sisteme ekler.
\`!say\` - Sistemdeki Botları Gösterir.
`)
.addField(`Links`, `[Furkan kaçer](http://ay.link/Kacer)
[Sunucuna ekle](https://ay.link/Uptime)
[Destek Sunucusu](https://discord.gg/pABjCEa)`)
.setThumbnail(client.user.avatarURL)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`Uptime Bot v1.0 Sürüm`, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})

const log = message => {
  console.log(`${message}`);
}
  
  ///