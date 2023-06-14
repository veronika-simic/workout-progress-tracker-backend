import { Request, Response } from "express";

const User = require("../models/User");
const jwt = require("jsonwebtoken")

const createToken = (_id: string) => {
 return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'} )
}
const login = async (req: Request, res: Response) => {};

const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id)
    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  signUp,
};
