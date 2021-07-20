import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

import Role from "../models/roles"
import User from "../models/user"
import response from "../libs/responses"
import config from "../config"

interface Ipaylaod {
  _id: string;
  iat: number;
  exp: number;
}

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.header('Authorization')
    if( token?.includes('Bearer ') ) {
      token = token.replace('Bearer ', '')
    } 
    if (!token) return response.error(req, res, 'Access token required', 400)

    const payload = jwt.verify(token, config.secret) as Ipaylaod
    req.userId = payload._id
    next()
  } catch (error) {
    console.error(error)
    return response.error(req, res, /expired/i.test(error.message) ? config.messages.tokenExpired : config.messages.provideToken, 400)
  }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId)
    if (user) {
      const roles = await Role.find({ _id: { $in: user.roles } })
      for (let i = 0; i < roles.length; i++) {
        if (roles[i]['name'] === "admin") {
          next()
          return
        }
      }
    }

    return response.error(req, res, config.messages.requireAdminRole, 403)
  } catch (error) {
    console.error(error)
    return response.error(req, res, config.messages.roleValidationError, 401)
  }
}

export const isUserOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId)
    if (user) {
      const roles = await Role.find({ _id: { $in: user.roles } })
      for (let i = 0; i < roles.length; i++) {
        if (roles[i]['name'] === "admin" || roles[i]['name'] === "user") {
          next()
          return
        }
      }
    }

    return response.error(req, res, config.messages.provideToken, 403)
  } catch (error) {
    console.error(error)
    return response.error(req, res, config.messages.roleValidationError, 401)
  }
}