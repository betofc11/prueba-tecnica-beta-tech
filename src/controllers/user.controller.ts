import data from '../models/data.json'
import { Request, Response } from 'express'
import { User } from '../models/users.model'



export function getUsers(req: Request, res: Response){
    try {
        const users: User[] = data as User[]
        if (!users) {
            throw new Error('There is not users to show')
        }
        res.json(users)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

export function getUser(req: Request, res: Response){
    try {
        const users: User[] = data as User[]
        const id = Number(req.params.id)
        const userFinded: User | undefined= users.find(user => user.id === id)
        if(!userFinded){
            throw new Error('User not found')
        }
        res.send(userFinded)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

export function createUser(req: Request, res: Response){
    try {
        const user: User[] = data as User[]
        const newUser: User = req.body
        newUser.id = user.length + 1
        user.push(newUser)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export function updateUser(req: Request, res: Response){
    try {
        const userList: User[] = data as User[]
        const id = Number(req.params.id)
        const index: number = userList.findIndex(user => user.id === id)
        console.log(index)
        if(!index){
            throw new Error('User not found')
        }
        const newUser: User = req.body
        const userUpdated: User[] = updateNewUser(userList, index, newUser)
        res.send(userUpdated)
    } catch (error) {
        console.error(error)
        res.status(404).send(error.message)
    }
}

export function deleteUser(req: Request, res: Response){
    try {
        const userList: User[] = data as User[]
        const id = Number(req.params.id)
        const userFinded = userList.find(user => user.id === id)
        if(!userFinded){
            throw new Error('User not found')
        }
        const newListUser: User[] = deleteNewUser(userList, userFinded)
        res.send(newListUser)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateNewUser = (userList: User[],index: number, userUpdated: User): User[] => {
    userList[index] = userUpdated
    return userList
}

const deleteNewUser = (userList: User[], userFinded: User): User[] => {
    userList.map((user: User, index: number) => {
        if(user.id === userFinded.id){
            userList.splice(index, 1)
        }
    })
    return userList
}