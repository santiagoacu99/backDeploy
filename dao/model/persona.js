const mongoose = require('mongoose')


const  userSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    localidad:{
        type: String,
        required: true,
    },
    direccion:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },

})

const Persona = mongoose.model('User', userSchema);
module.exports = Persona;

