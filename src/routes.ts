import { Router } from 'express'

import UserController from './controllers/UserController'
import AddressController from './controllers/AddressController'

const router = Router()

router.get('/users', UserController.index)
router.post('/users', UserController.store)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)

router.get('/users/:user_id/addresses', AddressController.index)
router.post('/users/:user_id/addresses', AddressController.store)
router.put('/users/:user_id/addresses', AddressController.update)
router.delete('/users/addresses/:id', AddressController.delete)

export default router
