const { generateId, getUsers } = require('../controllers/user.controller')
const axios = require('axios')

describe('Pruebas unitarias para la api de usuarios', () => {

  const user = {
    name: 'Juan',
    email: 'juan@juan.com',
    lastName: 'Perez',
    age: 30,
    phoneNumber: '123456789'

  }

  let newUser = {}

  it('Debe estar corriendo el servidor', async () => {
    await axios.get('http://localhost:3000/users').then((response: {status: number;}) => {
      expect(response.status).toBe(200)
    })
  })


  it('Debe de retornar una lista de usuarios', async () => {
    await axios.get(`http://localhost:3000/users`).then((response: { data: any; status: number; }) => {
      expect(response.data).toBeInstanceOf(Object);
    })
  })


  it('Debe crear un usuario', async () => {
    await axios.post(`http://localhost:3000/users`, user ).then((response: { data: any; }) => {
      expect(response.data[response.data.length -1]).toMatchObject(user)
    })
  })


  it('Debe actualizar un usuario', async () => {
    newUser = {
      name: 'Juan',
      email: 'juan@juan.com',
      lastName: 'Gomez',
      age: 27,
      phoneNumber: '987654321'
    }
    await axios.put(`http://localhost:3000/users/${generateId()}`, newUser ).then((response: { data: any; }) => {
      expect(response.data[response.data.length -1]).toMatchObject(newUser)
    })
  })


  it('Debe eliminar un usuario', async () => {
    await axios.delete(`http://localhost:3000/users/${generateId()}`).then((response: { data: any; }) => {
      expect(response.data[response.data.length -1]).not.toMatchObject(newUser)
    })
  })
})