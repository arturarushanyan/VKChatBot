const VK = require('vk-io');
const mongoose = require('mongoose');
const mongoWord = require('./models/WordModel');

const vk = new VK({
    token: "098a6b6ec7ba99092ad8d2bcb2cce59630e4fdcaa57d49a84aae31661cf718ad245d786fdb2ceeaa099a3"
});

mongoose.connect("mongodb://artur:artur@ds151661.mlab.com:51661/heroku_b0rdttvx");

const db = mongoose.connection;

db.on('error',() => console.error("hello error"));

db.once('open',() => console.log("server opened.."));

vk.longpoll.start()
    .then(() => {
        console.log('Long Poll запущен');
    })
    .catch((error) => {
        console.error(error);
    });


vk.longpoll.on('message', (msg) => {
    if(msg.flags.indexOf('outbox') !== -1){
        return;
    }
    console.log(msg);
    let parsedMessage = msg.text.toLowerCase().split(" ");
    let message = {
        word: parsedMessage[1],
        translation: parsedMessage[2]
    };
    if(parsedMessage[0] === "add"){
        mongoWord.addWord(message);
        msg.send('Your Word added');
        console.log(message);
    } else if(parsedMessage[0] === "get" && parsedMessage[1] !== "all"){
        mongoWord.getWord(message, (err, doc) => {
            console.log(doc);
            if (!err) msg.send(`your word is ${doc.translation}`)
        });
    } else if(parsedMessage[0] === "get" && parsedMessage[1] === "all"){
        mongoWord.getAll((err,doc) => {
            if (!err) {
                msg.send(`all existing translations are ${doc.translation}`)
            }
        })
    }

    // msg.send("your message is: "+msg.text);

});