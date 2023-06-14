export {};
import { Document, Model, model, Schema } from "mongoose";
const bcrypt = require("bcrypt");
const validator = require("validator");

interface User extends Document {
  email: string;
  password: string;
}

interface UserModel extends Model<User> {
  signup(email: string, password: string): Promise<void>;
}

const userSchema: Schema<User, UserModel> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (
  email: string,
  password: string
): Promise<User> {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not valid");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

const User: UserModel = model<User, UserModel>("User", userSchema);

export default User;
