import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

import { AddressSchema } from './types'

class AddressValidator {
  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<AddressSchema> = Yup.object().shape({
      street: Yup.string().required(),
      house_number: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required()
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

export default new AddressValidator()
