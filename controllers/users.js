import {response} from 'express';

const getUsers = (req,res = response) => {
    const {q, nombre, apikey} = req.query;

    res.json({
        msg:'get api - controlador',
        q,
        nombre,
        apikey
    })
}

const putUsers = (req,res = response) => {
    const id = req.params.id;

    res.json({
        msg:'put api - controlador',
        id
    })
}

const postUsers = (req,res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        msg:'post api - controlador',
        nombre,
        edad
    })
}

const deleteUsers = (req,res = response) => {
    res.json({
        msg:'delete api - controlador'
    })
}


export {getUsers, putUsers, postUsers, deleteUsers}