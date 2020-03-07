import { Request, Response } from 'express'

import RecipientsModel from '../models/RecipientsModel'

class RecipientController {
  async index (req: Request, res: Response): Promise<Response> {
    const recipients: RecipientsModel = await RecipientsModel.findAll()
    return res.json({ recipients: recipients })
  }

  async store (req: Request, res: Response): Promise<Response> {
    const recipient = await RecipientsModel.create(req.body)
    return res.json({ created_recipient: recipient })
  }

  async update (req: Request, res: Response): Promise<Response> {
    const recipient: RecipientsModel = await RecipientsModel.findByPk(req.params.id)

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' })
    }

    await recipient.update(req.body)

    return res.json({ updated_recipient: recipient })
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const recipient: RecipientsModel = await RecipientsModel.findByPk(req.params.id)

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' })
    }

    await RecipientsModel.destroy({ where: { id: recipient.id } })

    return res.send()
  }
}

export default new RecipientController()
