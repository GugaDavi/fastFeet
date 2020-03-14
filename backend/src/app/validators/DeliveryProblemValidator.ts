import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

import { DeliveryProblemSchema } from './types'

class DeliveryProblemValidator {
  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<DeliveryProblemSchema> = Yup.object().shape({
      description: Yup.string().required()
    })

    try {
      await schema.validate(req.body)

      return next()
    } catch (e) {
      const error = e as Yup.ValidationError
      return res.status(400).json({ validationError: error.message })
    }
  }
}

export default new DeliveryProblemValidator()
