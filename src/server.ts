import express from 'express'
import cors from 'cors'
import { createConnection } from 'typeorm'

import User from './models/User'

// Middleware
import time from './middlewares/time'

// Validators
import UserValidator from './validators/UserValidator'
import AddressValidator from './validators/AddressValidator'

// Controllers
import UserController from './controllers/UserController'
import AddressController from './controllers/AddressController'

require('dotenv').config()

createConnection().then(connection => {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(time)

  const userController = new UserController()
  app.get('/users', userController.index)

  app.post('/users', UserValidator.create, userController.create)
  app.put('/users/:id', UserValidator.update, userController.update)
  app.delete('/users/:id', userController.delete)

  // app.get('/users/:user_id/addresses', AddressController.index)
  // app.post(
  //   '/users/:user_id/addresses',
  //   AddressValidator.create,
  //   AddressController.create
  // )
  // app.put(
  //   '/users/addresses/:id',
  //   AddressValidator.update,
  //   AddressController.update
  // )
  // app.delete('/users/addresses/:id', AddressController.delete)

  const port = process.env.APP_PORT || 3333
  app.listen(port, () => {
    console.log(`Server is running! -> http://localhost:${port}`)
  })
}).catch(err => {
  console.log('CONNECTION ERROR', err)
})
