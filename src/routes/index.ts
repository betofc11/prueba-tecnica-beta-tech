import express, { Router } from 'express';
import { 
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser 
} from '../controllers/user.controller';

const router: Router = express.Router();

// Exportamos el router para poder usarlo en el index.ts

export default () => {
    router.get('/users', getUsers);

    router.get('/users/:id', getUser);

    router.post('/users', createUser);

    router.put('/users/:id', updateUser);

    router.delete('/users/:id', deleteUser);

    return router;
}