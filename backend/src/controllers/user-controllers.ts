import { NextFunction, Request, Response } from 'express';
import { compare, hash } from 'bcrypt';

import User from '../models/User.js';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';

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
    const { name, email, password } = req.body;

    // Ensure that the password is not empty
    if (!password) {
      return res.status(400).json({
        message: 'Password is required',
      });
    }

    // Ensure registration validity
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send('User already exists');

    const hashedPassword = await hash(password, 10);
    if (!hashedPassword) {
      return res.status(500).json({
        message: 'Error hashing the password',
      });
    }
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Create user and store cookie
    res.clearCookie(COOKIE_NAME, {
      path: '/',
      domain: '127.0.0.1',
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: '127.0.0.1',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: 'OK',
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Error from user signup',
      cause: error.message,
    });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    // Verify passwords match
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) return res.status(403).send('Incorrect password');

    res.clearCookie(COOKIE_NAME, {
      path: '/',
      domain: '127.0.0.1',
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: '127.0.0.1',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: 'OK',
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Error from user login',
      cause: error.message,
    });
  }
};
