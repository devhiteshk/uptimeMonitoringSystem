import { generateToken } from "../helpers/authHelper.js";
import User from "./../models/User.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  // *handle error for invalid JSON or incomplete data

  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "Invalid Form data",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Cannot be created",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      succes: false,
      message: "something went wrong",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        succes: false,
        message: "Invalid Credentials",
      });
    }

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });

    if (await bcrypt.compare(password, user.password)) {
      const token = generateToken(
        user._id,
        user.email,
        user.firstName,
        user.lastName
      );

      return res.json({
        succes: true,
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          imgUrl: user.imgUrl,
        },
        token: token,
      });
    }

    return res.status(401).json({
      status: false,
      message: "Invalid Credentials",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      succes: false,
      message: "something went wrong",
    });
  }
};
