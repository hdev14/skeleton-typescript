import { Request, Response } from 'express'
import Address from '../entities/Address'

class AddressController {
  async index (req: Request, res: Response) {
    const { user_id } = req.params
    if (!user_id) {
      return res.status(400).json({
        error: 'User id is required'
      })
    }
    const addresses = await Address.find({ user_id })
    return res.json(addresses)
  }

  async store (req: Request, res: Response) {
    const { user_id } = req.params
    if (!user_id) {
      return res.status(400).json({
        error: 'User id is required'
      })
    }
    const { street, neighborhood, address_number, city, state, complement } = req.body
    const address = new Address()
    address.user_id = user_id
    address.street = street
    address.neighborhood = neighborhood
    address.address_number = address_number
    address.city = city
    address.state = state
    address.complement = complement
    await address.save()

    return res.status(201).json(address)
  }

  async update (req: Request, res: Response) {
    const { id } = req.params
    const address = await Address.findOneOrFail(id)
    const { street, neighborhood, address_number, city, state, complement } = req.body
    address.street = street
    address.neighborhood = neighborhood
    address.address_number = address_number
    address.city = city
    address.state = state
    address.complement = complement
    await address.save()

    return res.json(address)
  }

  async delete (req: Request, res: Response) {
    const { id } = req.params
    const address = await Address.findOneOrFail(id)
    address.remove()
    return res.status(204).json()
  }
}

export default new AddressController()
