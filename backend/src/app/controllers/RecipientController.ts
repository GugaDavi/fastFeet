import { Request, Response } from "express";
import { Op } from "sequelize";

import RecipientsModel from "../models/RecipientsModel";
import Address from "../models/AddressModel";

class RecipientController {
  async index(req: Request, res: Response): Promise<Response> {
    const { page = 1, filter } = req.query;

    const findFilter = filter && {
      name: {
        [Op.like]: `${filter}%`,
      },
    };

    const recipients: RecipientsModel = await RecipientsModel.findAll({
      where: findFilter,
      include: [
        {
          model: Address,
          as: "address",
        },
      ],
      limit: 5,
      offset: (page - 1) * 5,
    });
    return res.json({ recipients: recipients });
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { name, address } = req.body;

    const createdAddress: Address = await Address.create(address);

    const recipient = await RecipientsModel.create(
      {
        name,
        address_id: createdAddress.id,
      },
      {
        include: [
          {
            model: Address,
            as: "address",
          },
        ],
      }
    );

    return res.json({ createdRecipient: recipient });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const recipient: RecipientsModel = await RecipientsModel.findByPk(
      req.params.id
    );

    if (!recipient) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    const { address } = req.body;

    if (address) {
      const updatedAddress: Address = await Address.findByPk(
        recipient.address_id
      );

      await updatedAddress.update(address);
    }

    await recipient.update(req.body);

    return res.json({ updated_recipient: recipient });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const recipient: RecipientsModel = await RecipientsModel.findByPk(
      req.params.id
    );

    if (!recipient) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    await RecipientsModel.destroy({ where: { id: recipient.id } });

    return res.send();
  }
}

export default new RecipientController();
