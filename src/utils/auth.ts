import jwt from "jsonwebtoken";

import config from "../config/serverConfig";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, config.SALT_ROUNDS);
};

export const validatePassword = async (
  plainPassword: string,
  hashPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};
export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
export const generateJWT = (user: {
  id: number;
  name: string;
  email: string;
}) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    config.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
