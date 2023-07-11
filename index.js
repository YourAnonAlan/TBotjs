require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");

const { getImage, getChat } = require("./Helper/functions");

const { Telegraf } = require("telegraf");

const configuration = new Configuration({

  apiKey: process.env.API,

});

const openai = new OpenAIApi(configuration);

module.exports = openai;

const bot = new Telegraf(process.env.TG_API);

bot.start((ctx) => ctx.reply("???????????? ? ?????????????????????????????????"));

bot.help((ctx) => {

  ctx.reply(

    "??????????????????\n \n ???????????????? ??????? /image???????????????(???? : /image beautiful girl)\n \n ????????????????????????????????????????? \n \n GP Chat ????????? /hey????????????????????????????????????????"

  );

});


//My Creator command
bot.command("mycreator" , (ctx) => {
  ctx.reply(
    "My Creator Info \n \n  Name : Ye Yint \n \n Age : 22\n \n FB : www.facebook.com/YourAnonAlan899\n \n YouTube : https://youtube.com/@onlybeatrixexemm \n\n TikTok : www.tiktok.com/@hallar899"
  );
});



// Image command

bot.command("image", async (ctx) => {

  const text = ctx.message.text?.replace("/image", "")?.trim().toLowerCase();

  if (text) {

   

    const res = await getImage(text);

    if (res) {

      ctx.sendChatAction("upload_photo");

      // ctx.sendPhoto(res);

      // ctx.telegram.sendPhoto()

      ctx.telegram.sendPhoto(ctx.message.chat.id, res, {

        reply_to_message_id: ctx.message.message_id,

      });

    }

  } else {

    ctx.telegram.sendMessage(

      ctx.message.chat.id,

      "You have to give some description after /image",

      {

        reply_to_message_id: ctx.message.message_id,

      }

    );

  }

});




// Chat command

bot.on('text',async(ctx)=>{

const text = ctx.message.text;

  if (text) {

    ctx.sendChatAction("typing");

    const res = await getChat(text);

    if (res) {

      ctx.telegram.sendMessage(ctx.message.chat.id, res, {

        reply_to_message_id: ctx.message.message_id,

      });

    }

  } else {

    ctx.telegram.sendMessage(

      ctx.message.chat.id,

      "Please ask anything",

      {

        reply_to_message_id: ctx.message.message_id,

      }

    );

  

    //  reply("Please ask anything");

  }

});


// GPChat command

bot.command("hey", async (ctx) => {
  const text = ctx.message.text?.replace("/hey", "")?.trim().toLowerCase();

  if (text) {
    ctx.sendChatAction("typing");
    const res = await getChat(text);
    if (res) {
      ctx.telegram.sendMessage(ctx.message.chat.id, res, {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } else {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      "Please ask anything after /hey",
      {
        reply_to_message_id: ctx.message.message_id,
      }
    );
  
    //  reply("Please ask anything after /hey");
  }
});


bot.launch();


