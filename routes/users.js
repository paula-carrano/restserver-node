import {Router} from 'express';
import { check } from 'express-validator';
import {getUsers, putUsers, postUsers, deleteUsers} from '../controllers/users.js';
import { validarCampos } from '../middleware/validar-campos.js';
import {isValidEmail, isValidRole,existUserById} from '../helpers/db-validators.js';

const router = Router();

router.get('/', getUsers);

router.post('/',[
    check('nombre', "Nombre es obligatorio").not().isEmpty(),
    check('password', "password debe de ser más de 6 letras ").isLength({min:6}),
    check('email', "Email no es válido").isEmail(),
    check('role').custom(isValidEmail),
    check('role').custom(isValidRole),
    validarCampos
],postUsers);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validarCampos
],putUsers);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validarCampos
],deleteUsers);

export {router}