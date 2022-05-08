const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombre: String,
    email: String,
    password: String,
    rol: String, 
    liga: [{
        nombre: String
    }]
})

module.exports = mongoose.model('Usuarios', usuariosSchema);