import { Request, Response } from 'express'

import Package from '../models/PackageModel'
import Recipient from '../models/RecipientsModel'
import Deliveryman from '../models/DeliverymanModel'
import File from '../models/FileModel'
import Signature from '../models/SignatureModel'

class PackageController {
  async index (req: Request, res: Response): Promise<Response> {
    const { page = 1 } = req.query

    const packages = await Package.findAll({
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name']
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'url']
            }]
        },
        {
          model: Signature,
          as: 'signature',
          attributes: ['path', 'url']
        }
      ],
      limit: 20,
      offset: (page - 1) * 20
    })

    return res.json({ packages: packages })
  }

  async store (req: Request, res: Response): Promise<Response> {
    const { recipient_id, deliveryman_id } = req.body

    // Check if Recipient exist

    if (recipient_id) {
      const recipientExist = await Recipient.findByPk(recipient_id)

      if (!recipientExist) {
        return res.status(404).json({ error: 'Recipient not found' })
      }
    }

    // Check if Deliveryman exist

    if (deliveryman_id) {
      const deliverymanExist = await Deliveryman.findByPk(deliveryman_id)

      if (!deliverymanExist) {
        return res.status(404).json({ error: 'Deliveryman not found' })
      }
    }

    const createdPackage = await Package.create(req.body)

    return res.json({ createdPackage: createdPackage })
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { recipient_id, deliveryman_id, signature_id } = req.body
    const { id: packageId } = req.params

    // Check if Package exist

    const reqPackage: Package = await Package.findByPk(packageId)

    if (!reqPackage) {
      return res.status(404).json({ error: 'Package not found' })
    }

    // Check if Recipient exist

    if (recipient_id) {
      const recipientExist = await Recipient.findByPk(recipient_id)

      if (!recipientExist) {
        return res.status(404).json({ error: 'Recipient not found' })
      }
    }

    // Check if Deliveryman exist

    if (deliveryman_id) {
      const deliverymanExist = await Deliveryman.findByPk(deliveryman_id)

      if (!deliverymanExist) {
        return res.status(404).json({ error: 'Deliveryman not found' })
      }
    }

    if (signature_id) {
      const signatureExist = await Signature.findByPk(signature_id)

      if (!signatureExist) {
        return res.status(404).json({ error: 'Signature not found' })
      }
    }

    const updatedPackage = await reqPackage.update(req.body)

    return res.json({ updatedPackage: updatedPackage })
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id: packageId } = req.params

    // Check if Package exist

    const reqPackage: Package = await Package.findByPk(packageId)

    if (!reqPackage) {
      return res.status(404).json({ error: 'Package not found' })
    }

    await reqPackage.destroy()

    return res.json()
  }
}

export default new PackageController()
