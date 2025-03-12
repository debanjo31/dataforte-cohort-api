import { Admin } from "../model/Admin.js";
import bcrypt from "bcryptjs";
import { adminRegister, options } from "../validation/admin.js";
import { generateToken } from "../utils/token.js";

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
    const { email, name, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({
        status: "fail",
        message: "Admin already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      email,
      name,
      password: hashedPassword,
    });
    await newAdmin.save();
    res.status(201).json({
      status: "success",
      message: "Admin created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
    const token = generateToken("admin", admin._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    if (req.user.userType === "admin") {
      res.status(400).json({
        status: "fail",
        message: "Access denied",
      });
    }
    const admin = await Admin.findById(req.user.userId).select("-password");
    res.status(200).json({
      status: "success",
      admin,
    });
  } catch (error) {
    console.log(error);
  }
};
