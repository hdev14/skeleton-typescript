import { Router } from 'express'

import User from './entities/User'

const router = Router()

router.get('/', async (req, res) => {
  const user = new User()
  user.name = 'user'
  user.email = 'user@email.com'
  user.password = '123456'
  user.save()

  const users = await User.find()
  return res.json(users)
})

export default router
