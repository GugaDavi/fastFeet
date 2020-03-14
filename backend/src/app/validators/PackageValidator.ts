import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

import { PackageSchema } from './types'

class PackageValidator {
  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<PackageSchema> = Yup.object().shape({
      recipient_id: Yup.number().required('Recipient ID is required'),
      deliveryman_id: Yup.number().required('Deliveryman ID is required'),
      product: Yup.string().required('Description of product is required')
    })

    try {
      await schema.validate(req.body)
    } catch (e) {
      const error: Yup.ValidationError = e
      return res.status(400).json({ validationError: error.message })
    }
    return next()
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<PackageSchema> = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string()
    })

    try {
      await schema.validate(req.body)
    } catch (e) {
      const error: Yup.ValidationError = e
      return res.status(400).json({ validationError: error.message })
    }
    return next()
  }
}

export default new PackageValidator()
