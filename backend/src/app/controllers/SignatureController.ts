import { Request, Response } from 'express'

import Signature from '../models/SignatureModel'

class SignatureController {
  async store (req: Request, res: Response): Promise<Response> {
    const { originalname: name, filename: path } = req.file

    const signature = await Signature.create({
      name,
      path
    })

    return res.json({ createdSignature: { signature } })
  }
}

export default new SignatureController()
