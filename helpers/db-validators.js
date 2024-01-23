import {Role} from '../models/role.js';
import {User} from '../models/user.js';

const isValidRole = async (rol = '' )=>{
    const existeRol = await Role.findOne({rol});
    if ( !existeRol) {
        throw new Error( `Role ${rol} does not exist` )
    }
}

const isValidEmail = async (email='') => {
    const emailExists = await User.findOne({email})
    if (emailExists) {
        throw new Error(`Email: ${email} is already in use`)
    }
}

const existUserById = async (id) => {
    const userExists = await User.findById(id);
    if (! userExists) {
        throw new Error(`Not exists id: ${id}`)
    }
}

export {isValidRole, isValidEmail,existUserById}