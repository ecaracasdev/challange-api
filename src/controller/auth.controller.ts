import { Request, Response } from 'express'
import jwt from "jsonwebtoken"

import config from '../config'
import response from '../libs/responses'
import User, { IUser } from '../models/user'
import Roles from '../models/roles'


class Auth {
  constructor() {

  }

  async signup(req: Request, res: Response) {

    const { firstName, lastName, dni, email, password, username, roles } = req.body

    const user: IUser = new User({
      firstName,
      lastName,
      dni,
      email,
      password,
      username
    })

    user.password = await user.encryptPassword(user.password)

    if (roles) {
      const foundRoles = await Roles.find({ name: { $in: roles } })
      user.roles = foundRoles.map((role: { _id: any }) => role._id)
    } else {
      const role = await Roles.findOne({ name: "user" })
      user.roles = [role._id]
    }

    const savedUser = await user.save()
    const token: string = jwt.sign({ _id: savedUser._id }, config.secret)
    response.sign_success(req, res, savedUser, config.messages.successSignup, 201, token)
  }

  async login(req: Request, res: Response) {

    const user = await User.findOne({ email: req.body.email })
    if (!user) return response.error(req, res, config.messages.loginError, 400)

    const correctPassword = await user?.validatePassword(req.body.password)
    if (!correctPassword) return response.error(req, res, config.messages.loginError, 400)

    const token: string = jwt.sign({ _id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24
    })

    response.sign_success(req, res, { email: user.email, password: user.password }, config.messages.loginSuccess, 200, token)
  }

  async profile(req: Request, res: Response) {
    const user = await User.findById(req.userId, { password: 0 }).populate('roles', 'name -_id')
    if (!user) return response.error(req, res, 'User not found', 400)
    response.success(req, res, user, config.messages.profileInfo, 200)
  }

}

const auth = new Auth
export default auth