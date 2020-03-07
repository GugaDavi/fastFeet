import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

import { RecipientSchema } from './types'

class RecipientValidator {
  async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<RecipientSchema> = Yup.object().shape({
      name: Yup.string().required('Name is required')
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
      name: Yup.string().required('Name is required')
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
