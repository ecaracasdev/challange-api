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
    if (!validId) return response.error(req, res, 'The id is not in the correct format', 400)
    //if(!id.match(/^[0-9a-fA-F]{24}$/)) return response.error(req, res, 'id not match', 400) //this could be another way to do the id validation

    next()
  } catch (error) {
    console.error(error)
    return response.error(req, res, error.message, 400)
  }
}

export const validateBody = async (req: Request, res: Response, next: NextFunction) => {
  try {

    console.log(`[middleware.validations] req.body `, req.body)
    const input: any = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      roles: req.body.roles
    }

    //validate is username or email exist
    const userExist = await User.findOne({ $or: [{ email: input.email }, { username: input.username }] })
    if (userExist) return response.error(req, res, `The email or username selected are not avaliables`, 400)

    //validate is role exist
    if (input.roles) {
      for (let i = 0; i < input.roles.length; i++) {
        if (!ROLES.includes(input.roles[i])) return response.error(req, res, `The provided role doesn't exist`, 400)
      }
    }

    //validate sigup or user create input
    for (const key in input) {
      if (validator.isEmpty(input[key])) return response.error(req, res, `The field ${key} can not be empty`, 400)
    }

    if (!validator.isEmail(input.email)) return response.error(req, res, `The field email has to be in the correct format`, 400)
    if (!validator.isNumeric(input.dni) || input.dni.length < 7) return response.error(req, res, `The field dni must be a seven digits number and should not contain special characters`, 400)
    if (!validator.isAlphanumeric(input.username)) return response.error(req, res, `The username must only contain alphanumeric characters`, 400)
    //this could be used for an strong password
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
      return response.error(req, res, `The password is not strong enough`, 400)
    }


    next()
  } catch (error) {
    console.error(error)
    return response.error(req, res, error.message, 400)
  }
}