const Usuarios = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')

function admin() {
    var modeloUsuario = new Usuarios();

    Usuarios.find({ email: "ADMIN" }, (err, usuarioEnocntrado) => {
        if (usuarioEnocntrado.length > 0) {
            return console.log("El Usuario Admin ya existe");
        } else {
            modeloUsuario.nombre = "ADMIN";
            modeloUsuario.email = "ADMIN";
            modeloUsuario.rol = "Rol_Admin";

            bcrypt.hash("deportes123", null, null, (err, passwordEncriptada) => {
                modeloUsuario.password = passwordEncriptada;

                modeloUsuario.save((err, usuarioGuardado) => {
                    if (err)
                        return res.status(500).send({ mensaje: "Error en la Peticion" });
                    if (!usuarioGuardado)
                        return res.status(500).send({ mensaje: "Usuario ya Registrado" });

                    return console.log("Admin:" + " " + usuarioGuardado);
                });
            });
        }
    });
}

function registrarUsuario(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuarios();

    if (parametros.nombre && parametros.email && parametros.password) {
        modeloUsuario.nombre = parametros.nombre;
        modeloUsuario.email = parametros.email;
        modeloUsuario.password = parametros.password;
        modeloUsuario.rol = "Rol_Usuario";

        Usuarios.find({ email: parametros.email }, (err, usuarioEncontrado) => {
            if (usuarioEncontrado.length == 0) {
                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    modeloUsuario.password = passwordEncriptada;
                    modeloUsuario.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: "Error en la Peticion" });
                        if (!usuarioGuardado) return res.status(500).send({ mensaje: "Error al Registrar Usuaurio" });

                        return res.status(200).send({ usuario: usuarioGuardado });
                    });
                }
                );
            }
        });
    } else {
        return res.status(500).send({ mensaje: "Tiene que  ingresar los parametros obligatorios" });
    }
}

function editarUsuario(req, res) {
    var parametros = req.body;

    delete parametros.password;

    Usuarios.findByIdAndUpdate(req.user.sub, parametros, { new: true }, (err, usuarioEditado) => {
        if (err) return res.status(500).send({ mensaje: "Error en  la peticion" });
        if (!usuarioEditado) return res.status(500).send({ mensaje: "Error al editar el Usuario" });

        return res.status(200).send({ usuario: usuarioEditado });
    }
    );
}

function eliminarUsuario(req, res) {

    Usuarios.findByIdAndDelete(req.user.sub, (err, usuarioEliminada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la Petición" });
        if (!usuarioEliminada)
            return res.status(500).send({ mensaje: "No se puede eliminar la Empresa" });

        return res.status(200).send({ usuario: usuarioEliminada });
    });
}

function verUsuario(req, res) {
    Usuarios.find({}, (err, usuarioEncontrado) =>{
        if(err) return res.status(500).send({ mensaje: 'Error en la Petición'});
        if(!usuarioEncontrado) return res.status(500).send({ mensaje: 'No existen Usuarios'});

        return res.status(200).send({ usuario: usuarioEncontrado});
    });
}

function login(req, res) {
    var parametros = req.body;

    Usuarios.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "Usuario no Encontrado" });
        if (usuarioEncontrado) {
            bcrypt.compare(
                parametros.password,
                usuarioEncontrado.password,
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado) });
                    } else {
                        return res.status(500).send({ mensaje: "Contraseña Invalida" });
                    }
                }
            );
        } else {
            return res.status(500).send({ mensaje: "El Usuario no se encuentra Registrado" });
        }
    });
}

module.exports = {
    admin,
    login,
    registrarUsuario,
    editarUsuario,
    eliminarUsuario,
    verUsuario
}