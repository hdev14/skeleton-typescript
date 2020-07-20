import { Router } from 'express'
import multer from 'multer'

import multerStorageConfig from './configs/multer-storage'

// Middlewares
import auth from './middlewares/auth'

// Validators
import SessionValidator from './validators/SessionValidator'
import UserValidator from './validators/UserValidator'
import AddressValidator from './validators/AddressValidator'

// Controllers
import SessionController from './controllers/SessionController'
import UserController from './controllers/UserController'
import AddressController from './controllers/AddressController'

const router = Router()

const sessionController = new SessionController()
const userController = new UserController()
const addressController = new AddressController()

router.post('/sessions', SessionValidator.create, sessionController.create)
router.post('/users', UserValidator.create, userController.create)

router.use(auth)

router.get('/users', userController.index)
router.put('/users/:id', UserValidator.update, userController.update)
router.delete('/users/:id', userController.delete)

const upload = multer({ storage: multerStorageConfig })
router.patch('/users/photo', upload.single('photo'), userController.updatePhoto)

router.get('/users/:user_id/addresses', addressController.index)
router.post('/users/:user_id/addresses', AddressValidator.create, addressController.create)
router.put('/users/addresses/:id', AddressValidator.update, addressController.update)
router.delete('/users/addresses/:id', addressController.delete)

export default router
