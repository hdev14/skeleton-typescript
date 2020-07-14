import { Router } from 'express'

// Validators
import UserValidator from './validators/UserValidator'
import AddressValidator from './validators/AddressValidator'

// Controllers
import UserController from './controllers/UserController'
import AddressController from './controllers/AddressController'

const router = Router()

router.get('/users', UserController.index)
router.post('/users', UserValidator.create, UserController.create)
router.put('/users/:id', UserValidator.update, UserController.update)
router.delete('/users/:id', UserController.delete)

router.get('/users/:user_id/addresses', AddressController.index)
router.post(
  '/users/:user_id/addresses',
  AddressValidator.create,
  AddressController.create
)
router.put(
  '/users/addresses/:id',
  AddressValidator.update,
  AddressController.update
)
router.delete('/users/addresses/:id', AddressController.delete)

export default router
