import {response} from 'express';
import bcrypt from "bcrypt";
import {User} from '../models/user.js';


const getUsers = async (req,res = response) => {

    const {limit = 5, from = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(from)
            .limit(limit)
    ]) 

    res.json({
        total,
        usuarios
    });
}

const postUsers = async (req,res = response) => {

    const {nombre, email, password, role} = req.body;
    const usuario = new User({nombre, email, password, role});

    //encriptar pass
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //guarda en BD
    await usuario.save();

    res.json(usuario)

}

const putUsers = async (req,res = response) => {
    const {id} = req.params;
    const {_id, password,google, ...rest} = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const usuario= await User.findByIdAndUpdate(id, rest);


    res.json(usuario)
}

const deleteUsers = async(req,res = response) => {

    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, {estado:false});

    res.json({
        user
    })
}

export {getUsers, putUsers, postUsers, deleteUsers}