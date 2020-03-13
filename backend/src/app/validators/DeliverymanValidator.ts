import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

import { DeliverymanSchema } from './types'

class DeliverymanValidator {
  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<DeliverymanSchema> = Yup.object().shape({
      name: Yup.string().required('Name is requred'),
      email: Yup.string().required('Email is required'),
      avatar_id: Yup.number()
    })

    try {
      await schema.validate(req.body)
    } catch (e) {
      const error: Yup.ValidationError = e
      return res.status(401).json({ validationError: error.message })
    }

    return next()
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<DeliverymanSchema> = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      avatar_id: Yup.number()
    })

    try {
      await schema.validate(req.body)
    } catch (e) {
      const error: Yup.ValidationError = e
      return res.status(401).json({ validationError: error.message })
    }

    return next()
  }
}

export default new DeliverymanValidator()
