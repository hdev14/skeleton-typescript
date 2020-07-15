import { getRepository } from 'typeorm'
import { Request, Response } from 'express'

import Address from '../models/Address'

class AddressController {
  async index (req: Request, res: Response) {
    const addresses = await getRepository(Address).find()
    return res.json(addresses)
  }

  async create (req: Request, res: Response) {
    const { user_id } = req.params
    const repository = getRepository(Address)
    const address = repository.create({ ...req.body, user_id })
    const createdAddress = await repository.save(address)
    return res.status(201).json(createdAddress)
  }

  async update (req: Request, res: Response) {
    try {
      const repository = getRepository(Address)
      const address = await repository.findOneOrFail(req.params.id)
      repository.merge(address, req.body)
      const updatedAddress = await repository.save(address)
      return res.json({ updatedAddress })
    } catch (err) {
      if (err.name === 'EntityNotFound') {
        return res.status(400).json({ error: err.message })
      } else {
        return res.status(500).json({ error: 'Something wrong' })
      }
    }
  }

  async delete (req: Request, res: Response) {
    try {
      const repository = getRepository(Address)
      const address = await repository.findOneOrFail(req.params.id)
      await repository.delete(address.id)
      return res.status(204).json()
    } catch (err) {
      if (err.name === 'EntityNotFound') {
        return res.status(400).json({ error: err.message })
      } else {
        return res.status(500).json({ error: 'Something wrong' })
      }
    }
  }
}

export default AddressController
