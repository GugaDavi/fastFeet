import { Request, Response } from 'express'

import DeliveryProblem from '../models/DeliveryProblemModel'
import Package from '../models/PackageModel'

class DeliveryProblemsController {
  async index (req: Request, res: Response): Promise<Response> {
    const problems = await DeliveryProblem.findAll({ include: [{ model: Package, as: 'delivery' }] })
    return res.json({ problems: problems })
  }

  async show (req: Request, res: Response): Promise<Response> {
    const problems = await DeliveryProblem.findAll({
      where: {
        delivery_id: req.params.packageId
      }
    })

    return res.json({ problems: problems })
  }

  async store (req: Request, res: Response): Promise<Response> {
    const { description } = req.body
    const problem = await DeliveryProblem.create({
      description,
      delivery_id: req.params.packageId
    }, {
      include: [
        {
          model: Package,
          as: 'delivery'
        }]
    })
    return res.json({ report: problem })
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const problem: DeliveryProblem = await DeliveryProblem.findByPk(req.params.reportId)

    if (!problem) {
      return res.status(403).json({ error: 'Report not found' })
    }

    const packageReport: Package = await Package.findByPk(problem.delivery_id)

    await packageReport.destroy()

    return res.json()
  }
}

export default new DeliveryProblemsController()
