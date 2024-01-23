import express from 'express';
import cors from 'cors';
import { router } from '../routes/users.js';
import { dbConnection } from '../dataBase/config.js';

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //conectar a DB
        this.conectarDB();

        this.middlewarwes();
        this.routes();  
    };

    async conectarDB() {
        await dbConnection();
    };

    middlewarwes(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //rutas de app
        this.app.use(express.static('public'));
    };

    routes() {
        this.app.use(this.usersPath, router);
    };

    listen(){
        this.app.listen(this.port, () => {
            console.log('listening on port', this.port)});
    }
};
