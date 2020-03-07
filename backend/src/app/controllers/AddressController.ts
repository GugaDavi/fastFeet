import { Request, Response } from 'express'

import AddressModel from '../models/AddressModel'

class AddressController {
  async index (req: Request, res: Response): Promise<Response> {
    const address = await AddressModel.findAll({
      where: { recipient_id: req.params.recipientId }
    })
    return res.json(address)
  }

  async store (req: Request, res: Response): Promise<Response> {
    const { street, house_number, city, state, zip_code, complement } = req.body
    const { recipientId } = req.params

    const address = await AddressModel.create({
      recipient_id: Number(recipientId),
      street,
      house_number,
      complement,
      city,
      state,
      zip_code
    })

    return res.json({ newAdress: address })
  }

  async update (req: Request, res: Response): Promise<Response> {
    return res.json()
  }

  async delete (req: Request, res: Response): Promise<Response> {
    return res.json()
  }
}

export default new AddressController()
