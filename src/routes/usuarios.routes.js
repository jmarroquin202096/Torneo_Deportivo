const express = require('express');
const controladorUsuario = require('../controller/usuarios.controller');

const md_autentificacion = require('../middlewares/autentificacion');

const api = express.Router();

api.post('/login', controladorUsuario.login);
api.post('/registrar', controladorUsuario.registrarUsuario);
api.put('/editarUsuario/:idUsuario', md_autentificacion.Auth, controladorUsuario.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario', md_autentificacion.Auth, controladorUsuario.eliminarUsuario);
api.get('/visualizarUsuarios', md_autentificacion.Auth, controladorUsuario.verUsuario);

module.exports = api;