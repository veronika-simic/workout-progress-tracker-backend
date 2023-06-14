import { Request, Response } from "express";
const User = require("../models/User");
const login = async (req: Request, res: Response) => {};

const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    res.status(200).json({ email, user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  signUp,
};
