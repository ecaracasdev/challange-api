import { Request, Response, NextFunction } from "express"
import validator from "validator"

import { ROLES } from "../models/roles"
import User from "../models/user"
import response from "../libs/responses"
import config from "../config"

export const isValidId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new User()
    const { id } = req.params

    const validId = await user.validateId(id)
    if (!validId) return response.error(req, res, config.messages.invalidId, 400)
    //if(!id.match(/^[0-9a-fA-F]{24}$/)) return response.error(req, res, 'id not match', 400) //this could be another way to do the id validation

    next()
  } catch (error) {
    console.error(error)
    return response.error(req, res, error.message, 400)
  }
}

export const validateBody = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const input: any = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      roles: req.body.roles || ''
    }

    console.log(input.roles)
    //validate is username or email exist
    const userExist = await User.findOne({ $or: [{ email: input.email }, { username: input.username }] })
    if (userExist) return response.error(req, res, config.messages.userExist, 400)

    //validate is role exist
    if (!!input.roles) {
      for (let i = 0; i < input.roles.length; i++) {
        if (!ROLES.includes(input.roles[i])) return response.error(req, res, config.messages.invalidRole, 400)
      }
    }

    //validate sigup or user create input
    for (const key in input) {
      if(key !== 'roles')
      if (validator.isEmpty(input[key])) return response.error(req, res, `The field ${key} can not be empty`, 400)
    }

    if (!validator.isEmail(input.email)) return response.error(req, res, config.messages.invalidEmail, 400)
    if (!validator.isNumeric(input.dni) || input.dni.length < 7) return response.error(req, res, config.messages.invalidDni, 400)
    if (!validator.isAlphanumeric(input.username)) return response.error(req, res, config.messages.invalidUsername, 400)
    if (!validator.isStrongPassword(input.password,
      {
        minLength: 5,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        returnScore: false,
        pointsPerUnique: 0,
        pointsPerRepeat: 0,
        pointsForContainingLower: 0,
        pointsForContainingUpper: 0,
        pointsForContainingNumber: 0,
        pointsForContainingSymbol: 0
      })
    ) {
      return response.error(req, res, config.messages.invalidPassword, 400)
    }


    next()
  } catch (error) {
    console.error(error)
    return response.error(req, res, error.message, 400)
  }
}

export const validateSonCreation = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const input: any = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
    }

    const userExist = await User.findOne({ dni: input.dni })
    if (userExist) return response.error(req, res, config.messages.dniExist, 400)

    for (const key in input) {
      if (validator.isEmpty(input[key])) return response.error(req, res, `The field ${key} can not be empty`, 400)
    }

    if (!validator.isNumeric(input.dni) || input.dni.length < 7) return response.error(req, res, config.messages.invalidDni, 400)
    if (!validator.isAlphanumeric(input.firstName)) return response.error(req, res, config.messages.invalidUsername, 400)
    if (!validator.isAlphanumeric(input.lastName)) return response.error(req, res, config.messages.invalidUsername, 400)

    next()
  } catch (error) {
    console.error(error)
    return response.error(req, res, error.message, 400)
  }
}

