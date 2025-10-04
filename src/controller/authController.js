import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import signupValidiator from "../helper/signupValidiator.js";
import loginValidiator from "../helper/loginValidiator.js";

export const registerController = async (req, res) => {
  const { error } = signupValidiator(req.body);
  const { username, email, password } = req.body;
  try {
  if (error) {
    console.log(error);
    return res.status(400).send(error);
  }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true });
    res.redirect('/home');
  } catch (error) {
    console.log(error);
    res.status(500).send("soomething wents wrong");
  }
};

export const loginController = async (req, res) => {
  const { error } = loginValidiator(req.body);
  if (error) {
    console.log(error);
   return res.status(400).send(error);
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("user not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("invalid credentials");
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true });
    res.redirect('/home');
  } catch (error) {
    console.log(error);
    res.status(500).send("something wents wrong");
  }
};
