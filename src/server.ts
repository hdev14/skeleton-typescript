import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { createConnection } from 'typeorm'
import multer from 'multer'

// Middlewares
import time from './middlewares/time'
import auth from './middlewares/auth'
import globalErrorHandler from './middlewares/global-error-handler'

// Validators
import SessionValidator from './validators/SessionValidator'
import UserValidator from './validators/UserValidator'
import AddressValidator from './validators/AddressValidator'

// Controllers
import SessionController from './controllers/SessionController'
import UserController from './controllers/UserController'
import AddressController from './controllers/AddressController'

import multerStorageConfig from './configs/multer-storage'

require('dotenv').config()

createConnection().then(connection => {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(time)

  const sessionController = new SessionController()
  const userController = new UserController()
  const addressController = new AddressController()

  app.post('/sessions', SessionValidator.create, sessionController.create)
  app.post('/users', UserValidator.create, userController.create)

  app.use(auth)

  app.get('/users', userController.index)
  app.put('/users/:id', UserValidator.update, userController.update)
  app.delete('/users/:id', userController.delete)

  const upload = multer({ storage: multerStorageConfig })
  app.patch('/users/photo', upload.single('photo'), userController.updatePhoto)

  app.get('/users/:user_id/addresses', addressController.index)
  app.post('/users/:user_id/addresses', AddressValidator.create, addressController.create)
  app.put('/users/addresses/:id', AddressValidator.update, addressController.update)
  app.delete('/users/addresses/:id', addressController.delete)

  // Global Error Handling
  app.use(globalErrorHandler)

  const port = process.env.APP_PORT || 3333
  app.listen(port, () => {
    console.log(`Server is running! -> http://localhost:${port}`)
  })
}).catch(err => {
  console.log('CONNECTION ERROR -> ', err)
})
