import { Request, Response } from 'express'
import { getAllUsers, replaceUsers } from '../models/services/userService'
import { User } from '../models/users.model'

// Obtiene todos los usuarios desde userService
const userList: User[] = getAllUsers() as User[]

export function getUsers(req: Request, res: Response){
    try {
        // Si no hay usuarios en la lista, se envia un mensaje de error
        if (!userList) {
            throw new Error('No hay usuarios para mostrar')
        }
        res.json(userList)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

export function getUser(req: Request, res: Response){
    try {
        // Se obtiene el id del usuario por el parametro id
        const id = Number(req.params.id)
        // Se busca el usuario en la lista, si existe se retorna de tipo User, si no undefined
        const userFinded: User | undefined= userList.find(user => user.id === id)
        // Si es de tipo undefined, se envia un mensaje de error
        if(!userFinded){
            throw new Error('Usuario no encontrado')
        }
        res.send(userFinded)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

export function createUser(req: Request, res: Response){
    try {
        const newUser: User = req.body // Se obtienen los datos del usuario
        newUser.id = generateId() // Se genera un id para el usuario
        userList.push(newUser) // Se agrega el usuario a la lista
        res.send(replaceUsers(userList)) // Se reemplaza el archivo json y se responde con la lista actualizada
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export function updateUser(req: Request, res: Response){
    try {
        const id = Number(req.params.id) // Se obtiene el id del usuario por el parametro id
        const index: number = userList.findIndex(user => user.id === id) // Se busca el usuario en la lista, si existe se retorna el indice, si no -1
        // Si el indice es -1, se envia un mensaje de error
        if(index === -1){
            throw new Error('Usuario no encontrado')
        }
        const newUser: User = req.body // Se obtienen los datos del usuario
        const userUpdated: User[] = updateNewUser(userList, index, newUser) // Se actualiza el usuario
        res.send(replaceUsers(userUpdated)) // Se reemplaza el archivo json y se responde con la lista actualizada
    } catch (error) {
        res.status(404).send(error.message)
    }
}

export function deleteUser(req: Request, res: Response){
    try {
        const id = Number(req.params.id) // Se obtiene el id del usuario por el parametro id
        const userFinded = userList.find(user => user.id === id) // Se busca el usuario en la lista, si existe se retorna de tipo User, si no undefined
        // Si es de tipo undefined, se envia un mensaje de error
        if(!userFinded){
            throw new Error('Usuario no encontrado')
        }
        const newListUser: User[] = deleteNewUser(userList, userFinded) // Se elimina el usuario
        res.send(replaceUsers(newListUser)) // Se reemplaza el archivo json y se responde con la lista actualizada
    } catch (error) {
        res.status(500).send(error.message)
    }
}

// Metodo que actualiza el usuario, el cual recibe el indice del usuario, el usuario nuevo y la lista de usuarios
const updateNewUser = (userList: User[],index: number, userUpdated: User): User[] => {
    userList[index] = {
        id: userList[index].id,
        name: userUpdated.name,
        lastName: userUpdated.lastName,
        age: userUpdated.age,
        email: userUpdated.email,
        phoneNumber: userUpdated.phoneNumber
    } as User
    
    return userList
}

// Metodo que elimina el usuario, el cual recibe el usuario a eliminar y la lista de usuarios
const deleteNewUser = (userList: User[], userFinded: User): User[] => {
    userList.map((user: User, index: number) => {
        if(user.id === userFinded.id){
            userList.splice(index, 1)
        }
    })
    return userList
}

// Metodo que genera un id para el usuario
const generateId = (): number => {
    let id: number = 0
    userList.map(user => {
        if(user.id > id){
            id = user.id
        }
    })
    return id + 1
}