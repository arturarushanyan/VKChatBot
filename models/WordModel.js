const mongoose = require('mongoose');

let wordSchema = mongoose.Schema({
    word: String,
    translation: String

},{
    versionKey: false,
    strict: false
});

let WordModel = mongoose.model('Words', wordSchema);



const mongoWord = {

    addWord: (msg) => {
        WordModel.create({
                word: msg.word,
                translation: msg.translation
            },
            (err,result) => {
                if (err){
                    throw err;
                } else {
                    console.log('Word Created!'+result);
                }
            });
    },

    getWord: (msg, next) => {
        WordModel.findOne({word: msg.word}, null, {lean :true}, (err,result) => {
            if(err){
                throw err;
            } else {
                next(null, result);
            }
        });
    },

    getAll: (next) => {
        WordModel.find({},null,{lean: true},(err,result) => {
            if (err){
                throw err;
            } else {
                next(null,result);
            }
        });
    }
};

module.exports = mongoWord;