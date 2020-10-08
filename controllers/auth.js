const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT}=require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email })
        // console.log(usuario)
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            });
        }
        usuario = new Usuario(req.body);
        //Encriptando contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt);
        //----------------------
        //Usuario guardado en la BD
        usuario.save();
        //----------------------
        //Generar JWT
        const token=await generarJWT(usuario.id,usuario.name);
        //----------------------
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        //Confirmar passwords
        const validPassowrd = bcrypt.compareSync(password, usuario.password)
        if (!validPassowrd) {
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecto'
            });
        }
          //Generar JWT
          const token=await generarJWT(usuario.id,usuario.name);
          //----------------------

        res.json({
            ok: true,
            msg: 'Login Usuario',
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'


        });
    }
}



const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Revalidar token'
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}