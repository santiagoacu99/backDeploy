const mongoose = require('mongoose')


const  productSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    precio:{
        type: Number,
        required: true,
    },
    categoria:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: true,
    },


})

const Product= mongoose.model('Product', productSchema);
module.exports = Product;