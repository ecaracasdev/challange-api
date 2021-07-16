import { Request, Response } from 'express'
import response from '../network/responses';
import User, { IUser } from '../models/user';

import jwt from "jsonwebtoken";

class Auth {
  constructor() {
    
  }

  //REGISTER USER
  async signup(req: Request, res: Response) {

    //saving new user
    const {firstName, lastName, dni, email, password, username } = req.body;

    const user: IUser = new User({
      firstName, 
      lastName, 
      dni, 
      email, 
      password, 
      username 
    })

    user.password = await user.encryptPassword(user.password)
    const savedUser = await user.save()

    console.log(`[auth.controller] Datos usuario creado: \n`, savedUser)

    //token
    const token: string = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || 'token_test')
    response.sign_success(req, res, savedUser, 'User registered', 201, token)
  }
  
  //LOGIN USER
  async login(req: Request, res: Response) {

    const user = await User.findOne({email:req.body.email})
    if(!user) return response.error(req, res, 'Email or password are wrong', 400)

    const correctPassword = await user?.validatePassword(req.body.password);
    if(!correctPassword) return response.error(req, res, 'Invalid password', 400)

    const token: string = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'token_test', {
      expiresIn:60 * 60 * 24
    })

    response.sign_success(req, res, {email: user.email, password:user.password}, 'Login success', 200, token)
  }

  //USER PROFILE
  async profile(req: Request, res: Response) {
    const user = await User.findById(req.userId, {password:0}) || ''
    if(!user) response.error(req, res, 'User not found', 400)
    response.success(req, res, user , 'profile', 200)
  }

}

const auth = new Auth;
export default auth;