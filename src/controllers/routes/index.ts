import express, { Router } from 'express';
import { 
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser 
} from '../user.controller';

const router: Router = express.Router();

// Exportamos las rutas para poder usarlo en el index.ts

export default () => {
    // Obtiene todos los usuarios
    router.get('/users', getUsers);

    // Obtiene un usuario obteniendo como parametro el id de tipo number
    router.get('/users/:id', getUser);

    // Crea un nuevo usuario
    router.post('/users', createUser);

    // Actualiza un usuario obteniendo como parametro el id de tipo number
    router.put('/users/:id', updateUser);

    // Elimina un usuario obteniendo como parametro el id de tipo number
    router.delete('/users/:id', deleteUser);

    return router;
}