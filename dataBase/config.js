import mongoose from 'mongoose';

const dbConnection = async() => {
    try {
       await mongoose.connect(process.env.MONGODB_CNN,
        console.log("Base de datos online"))

    }catch(e){
        console.log(e);
        throw new Error('Error al inicializar la base de datos')
    }
};

export {dbConnection};