/*
    #   En services lo utilizaremos para extraer la informacion del archivo json, 
        que es donde se encuentran los datos
    #   Tambien se reescribira el archivo json cuando se haga alguna modificacion
*/

import * as path from 'path'
import { User } from '../models/users.model';
const fs = require('fs');

// Se define la direccion del archivo json
const PATH = '../data/data.json'
const userPath = path.resolve(__dirname, PATH);

// Obtiene todos los usuarios del archivo json
export function getAllUsers() {
    const data: User[] = JSON.parse(fs.readFileSync(userPath))
    return data;
}

// Reemplaza el contenido del archivo json
export function replaceUsers(newUsers: User[]) {
    fs.writeFileSync(userPath, JSON.stringify(newUsers));
    const data: User[] = getAllUsers()
    return data;
}