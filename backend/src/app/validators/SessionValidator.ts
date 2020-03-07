import { Request, Response, NextFunction } from 'express'
import * as Yup from 'yup'

import { SessionSchema } from './types'

class SessionValidator {
  public async store (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const schema: Yup.Schema<SessionSchema> = Yup.object().shape({
      email: Yup.string().required('Email is Required'),
      password: Yup.string().required('Password is Required').min(6)
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

export default new SessionValidator()
