import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcrypt';

import User from '../models/User.js';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: 'OK',
      users,
    });
  } catch (error) {
    console.log('Error from get all users function', error);

    return res.status(404).json({
      message: 'Error from get all users function',
      cause: error.message,
    });
  }
};

export const userSignup = async (req, res, next) => {
  try {
    console.log('Received request body:', req.body);

    const { name, email, password } = req.body;

    // Ensure that the password is not empty
    if (!password) {
      return res.status(400).json({
        message: 'Password is required',
      });
    }
    const hashedPassword = await hash(password, 10);

    if (!hashedPassword) {
      return res.status(500).json({
        message: 'Error hashing the password',
      });
    }
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(200).json({
      message: 'OK',
      id: user._id.toString(),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Error from user signup',
      cause: error.message,
    });
  }
};
