import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

import { RecipientSchema } from './types'

class RecipientValidator {
  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<RecipientSchema> = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      address: Yup.object().shape({
        street: Yup.string().required(),
        house_number: Yup.string().required(),
        complement: Yup.string(),
        state: Yup.string().required(),
        city: Yup.string().required(),
        zip_code: Yup.string().required()
      }).required()
    })

    try {
      await schema.validate(req.body)

      return next()
    } catch (e) {
      const error = e as Yup.ValidationError
      return res.status(400).json({ validationError: error.message })
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<RecipientSchema> = Yup.object().shape({
      name: Yup.string(),
      address: Yup.object().shape({
        street: Yup.string(),
        house_number: Yup.string(),
        complement: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        zip_code: Yup.string()
      })
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

export default new RecipientValidator()
