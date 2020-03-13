import { Request, Response } from 'express'

import Deliveryman from '../models/DeliverymanModel'
import File from '../models/FileModel'

class DeliverymanController {
  async index (req: Request, res: Response): Promise<Response> {
    const deliverymans = await Deliveryman.findAll()
    return res.json({ deliverymans: deliverymans })
  }

  async store (req: Request, res: Response): Promise<Response> {
    const { email, avatar_id } = req.body

    // Check if the email is in use
    const isUsedMail = await Deliveryman.findOne({
      where: {
        email
      }
    })

    if (isUsedMail) {
      return res.status(401).json({ error: 'Email is not available' })
    }

    // Check if the avatar_id exists

    const avatarFile = await File.findByPk(avatar_id)

    if (avatar_id && !avatarFile) {
      return res.status(401).json({ error: 'The avatar file is not available' })
    }

    const deliveryman = await Deliveryman.create(req.body)

    return res.json({ createdDeliveryman: deliveryman })
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { name, email, avatar_id } = req.body

    // Check if deliveryman exist

    const deliverymanExist: Deliveryman = await Deliveryman.findByPk(req.params.id)

    if (!deliverymanExist) {
      return res.status(404).json({ error: 'This Deliveryman not exists' })
    }

    // Check if the email is in use
    if (email) {
      const isUsedMail = await Deliveryman.findOne({
        where: {
          email
        }
      })

      if (isUsedMail) {
        return res.status(401).json({ error: 'Email is not available' })
      }
    }

    // Check if the avatar_id exists

    if (avatar_id) {
      const avatarFile = await File.findByPk(avatar_id)

      if (avatar_id && !avatarFile) {
        return res.status(401).json({ error: 'The avatar file is not available' })
      }
    }

    const updatedDeliveryman = await deliverymanExist.update(req.body)

    return res.json({ updatedDeliveryman: updatedDeliveryman })
  }

  async delete (req: Request, res: Response): Promise<Response> {
    // Check if deliveryman exist

    const deliverymanExist: Deliveryman = await Deliveryman.findByPk(req.params.id)

    if (!deliverymanExist) {
      return res.status(404).json({ error: 'This Deliveryman not exists' })
    }

    await deliverymanExist.destroy()

    return res.json()
  }
}

export default new DeliverymanController()
