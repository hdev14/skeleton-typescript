import { getRepository } from 'typeorm'
import { Request, Response } from 'express'

import Address from '../models/Address'

import notfoundError from '../helpers/notfound-error'

class AddressController {
  public async index (req: Request, res: Response) {
    const addresses = await getRepository(Address).find({ where: { user_id: req.params.user_id } })
    return res.json(addresses)
  }

  public async create (req: Request, res: Response) {
    const { user_id } = req.params
    const repository = getRepository(Address)
    const address = repository.create({ ...req.body, user_id })
    const createdAddress = await repository.save(address)
    return res.status(201).json(createdAddress)
  }

  public async update (req: Request, res: Response) {
    try {
      const repository = getRepository(Address)
      const address = await repository.findOneOrFail(req.params.id)
      repository.merge(address, req.body)
      const updatedAddress = await repository.save(address)
      return res.json({ updatedAddress })
    } catch (err) {
      return notfoundError(err)
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const repository = getRepository(Address)
      const address = await repository.findOneOrFail(req.params.id)
      await repository.delete(address.id)
      return res.status(204).json()
    } catch (err) {
      return notfoundError(err)
    }
  }
}

export default AddressController
