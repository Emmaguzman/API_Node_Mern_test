const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')

const router = Router();
//Login
router.post(
    '/',
    [
        check('email', 'El email no es valido').isEmail(),
        check('password', 'La password debe tener mas de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

//Registro
router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('password', 'La password debe tener mas de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

//RevalidarToken
router.get('/renew', revalidarToken)

module.exports = router;




