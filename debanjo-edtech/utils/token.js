import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const generateToken = (userType, userId) => {
  return jwt.sign({ userType, userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
