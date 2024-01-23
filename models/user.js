import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es Obligatoria']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emum: ['USER_ROLE', 'ADMIN_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function(){
    const {__v,password, ...user} = this.toObject();
    return user;
};

const User = model('User', UserSchema);

export {User}