const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
    titulo: {
        type:String,
        require: true
    },
    autor: {
        type:String,
        require: true
    },
    anoLancamento: {
        type:Number,
        require: true
    },
    genero: {
        type:String,
        require:true
    },
    imagem:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Livro', livroSchema);