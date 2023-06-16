import { Request, Response, NextFunction } from "express";
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const requireAuth = async function (
 req: { headers: { authorization: any; }; user: any; },
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request not authorized" });
  }
};

module.exports = requireAuth;
