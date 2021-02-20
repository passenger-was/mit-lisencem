const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
//------------------------------------------------------------------------------------------------------------\\



  
client.on("guildMemberAdd", async (member) => {
member.setNickname(ayarlar.nick)

});




client.on("ready", async () => {
  let botVoiceChannel = client.channels.cache.get(ayarlar.botVoiceChannelID);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});




//------------------------HOŞGELDİN-EMBEDSİZ-----------------------\\
const hookl = new Discord.WebhookClient('807244134187401224', 'A4-2bnw9qd2yBASh3K-tvphWKCLT0daKVdWs7S2rh7yGHhuMN-OUTtrjJxH-3H82Qhc9');

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `<a:0c:807245739197595651>`,
            '1': `<a:1c:807245739616108585>`,
            '2': `<a:2c:807245737926197269>`,
            '3': `<a:3c:807245737871409152>`,
            '4': `<a:4c:807245737351839835>`,
            '5': `<a:5c:807245739432476722>`,
            '6': `<a:6c:807245739054333972>`,
            '7': `<a:7c:807245739565645874>`,
            '8': `<a:8c:807245739180425277>`,
            '9': `<a:9c:807245737464168508>`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === "807177849236750336");
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
 //   var kontrol;
 // if (kurulus < 1296000000) kontrol = ' <a:olmaz:804370229681455135> Hesap Durumu: Güvenilir Değil.'
//if (kurulus > 1296000000) kontrol = ' <a:olur:804370228237566003>  Hesap Durumu: Güvenilir Gözüküyor.'
    hookl.send(`
 :tada: Submarine'ye hoş geldin <@`+ member + `> ! 
 
 Hesabın \``+gecen+`\` tarihinde oluşturulmuş.

 Sunucu kurallarımız <#807177970216075285> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.

 Seninle beraber sunucumuz toplam `+üyesayısı+ ` kişi olduk! Sol tarafta bulunan **V.Confirmed** odalarından birine girerek kayıt işlemini gerçekleştirebilirsin. <@&807177606360596530>

 Tagımıza ulaşmak için herhangi bir kanala \`.tag\` yazman yeterlidir. Şimdiden iyi eğlenceler! :tada: :tada:`)});
  
//------------------------HOŞGELDİN-EMBEDSİZ-----------------------\\
//`+kontrol+`


//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add('807177645359104000'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG


//------------------------------------------------------------------------------------------------------------\\

client.on("message", message => {
    if(message.content.toLowerCase() == "!tag") 
    return message.channel.send(`✯`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "tag") 
    return message.channel.send(`✯`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "u!tag") 
    return message.channel.send(`✯`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == ".tag") 
    return message.channel.send(`✯`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "u-tag") 
    return message.channel.send(`✯`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "!!tag") 
    return message.channel.send(`✯`)
});

//------------------------------------------------------------------------------------------------------------\\

client.on("message", message => {
    if(message.content.toLowerCase() == "sa") 
    return message.channel.send(`${message.author}, Aleyküm selam hoşgeldin.`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "selamın aleyküm") 
    return message.channel.send(`${message.author}, Aleyküm selam hoşgeldin.`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "selam") 
    return message.channel.send(`${message.author}, Selam hoşgeldin.`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "merhaba") 
    return message.channel.send(`${message.author}, Merhaba hoşgeldin.`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "passenger") 
    return message.channel.send(`Passenger adamdır :heart: :heart:`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "s.a") 
    return message.channel.send(`${message.author}, Aleyküm Selam.`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "mrb") 
    return message.channel.send(`${message.author}, Aleyküm Selam.`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "slm") 
    return message.channel.send(`${message.author}, Selam hoşgeldin.`)
});

//------------------------------------------------------------------------------------------------------------\\
//3600

