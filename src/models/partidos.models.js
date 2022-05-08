const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partidosSchema = Schema({
    idEquipo1: {type: Schema.Types.ObjectId, ref: 'Equipos'},
    golesEquipo1: Number,
    idEquipo2: {type: Schema.Types.ObjectId, ref: 'Equipos'},
    golesEquipo2: Number,
    jornada: Number,
    idUsuario: {type: Schema.Types.ObjectId, ref: 'Usuarios'}
});

module.exports = mongoose.model('Partidos', partidosSchema);