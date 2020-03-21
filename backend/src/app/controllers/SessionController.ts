import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import jwtConfig from "../../config/auth";

import UserModel from "../models/UserModel";

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user: UserModel = await UserModel.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const { id, name, email: loggedEmail } = user;

    return res.json({
      user: {
        id,
        name,
        email: loggedEmail,
      },
      token: jwt.sign({ id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
