const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equiposSchema = new Schema({
    nombre: String,
    GF: Number,
    GF: Number,
    DG: Number,
    PJ: Number,
    puntos: Number,
    idLiga: {types: Schema.Types.ObjectId, ref: 'Usuarios'}
})

module.exports = mongoose.model('Equipos', equiposSchema);