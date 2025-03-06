import { Admin } from "../model/Admin.js";
import bcrypt from "bcryptjs";
import { adminRegister, options } from "../validation/admin.js";

export const createAdmin = async (req, res) => {
  try {
    const validate = adminRegister.validate(req.body, options);
    if (validate.error) {
      const message = validate.error.details
        .map((detail) => detail.message)
        .join(", ");
      return res.status(400).json({
        status: "fail",
        message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const loginAdmin = async (req, res) => {};
