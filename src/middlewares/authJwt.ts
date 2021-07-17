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
    let token: string = req.header('auth-token') || ''
    if (!token) response.error(req, res, 'Access token required', 400)

    const payload = jwt.verify(token, config.secret) as Ipaylaod
    //declaration merging
    req.userId = payload._id

    next()

  } catch (error) {
    console.error(error)
    return response.error(req, res, 'Token must be provided', 400)
  }
}

export const isModerator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId)
    if (user) {
      const roles = await Role.find({ _id: { $in: user.roles } })
      for (let i = 0; i < roles.length; i++) {
        if (roles[i]['name'] === "moderator" || roles[i]['name'] === "admin") {
          next()
          return
        }
      }
    }

    return response.error(req, res, "Require moderator role", 403)
  } catch (error) {
    console.error(error)
    return response.error(req, res, 'An error ocurred while checking moderator role', 401)
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

    return response.error(req, res, "Require admin role", 403)
  } catch (error) {
    console.error(error)
    return response.error(req, res, 'An error ocurred while checking moderator role', 401)
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

    return response.error(req, res, "You can't do this action without login first", 403)
  } catch (error) {
    console.error(error)
    return response.error(req, res, 'An error ocurred while checking moderator role', 401)
  }
}