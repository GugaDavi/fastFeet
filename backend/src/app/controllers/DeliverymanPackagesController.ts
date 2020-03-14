import { Request, Response } from 'express'
import { startOfDay, endOfDay } from 'date-fns'
import { Op } from 'sequelize'

import Address from '../models/AddressModel'
import Package from '../models/PackageModel'
import Recipient from '../models/RecipientsModel'
import Signature from '../models/SignatureModel'

class DeliverymanPackagesController {
  async index (req: Request, res: Response): Promise<Response> {
    const { page = 1 } = req.query

    const packages = await Package.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
          include: [
            {
              model: Address,
              as: 'address'
            }
          ]
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

  async show (req: Request, res: Response): Promise<Response> {
    const { page = 1 } = req.query

    const packages = await Package.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: {
          [Op.ne]: null
        }
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name']
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
    return res.json({ closedPackages: packages })
  }

  async store (req: Request, res: Response): Promise<Response> {
    // Check if Package exist

    const packageExist = await Package.findOne({
      where: {
        id: req.params.packageId,
        deliveryman_id: req.params.id
      }
    })

    if (!packageExist) {
      return res.status(404).json({ error: 'Package not found' })
    }

    // Make sure you have 5 or more packages open

    const { count } = await Package.findAndCountAll({
      where: {
        deliveryman_id: req.params.id,
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())]
        }
      }
    })

    if (count >= 5) {
      return res.status(401).json({ error: 'You cannot open more than 5 packages per day' })
    }

    // Check if Package was opened

    if (packageExist.start_date !== null) {
      return res.status(401).json({ error: `Package was open in ${packageExist.start_date}` })
    }

    packageExist.start_date = new Date()

    const updatedPackage = await packageExist.save()

    return res.json({ openedPackage: updatedPackage })
  }

  async update (req: Request, res: Response): Promise<Response> {
    const openedPackage: Package = await Package.findOne({
      where: {
        id: req.params.packageId,
        deliveryman_id: req.params.id
      }
    })

    if (!openedPackage) {
      return res.status(403).json({ error: 'Package not found' })
    }

    if (openedPackage.start_date === null) {
      return res.status(401).json({ error: 'Package is not open' })
    }

    if (openedPackage.end_date !== null) {
      return res.status(401).json({ error: `Package was closed in ${openedPackage.end_date}` })
    }

    if (req.file) {
      const { originalname: name, filename: path } = req.file

      const signature: Signature = await Signature.create({
        name,
        path
      })

      openedPackage.signature_id = signature.id
    }

    openedPackage.end_date = new Date()

    const updatedPackage = await openedPackage.save()

    return res.json({ closedPackage: updatedPackage })
  }
}

export default new DeliverymanPackagesController()
