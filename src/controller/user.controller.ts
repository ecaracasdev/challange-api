import { Request, Response } from 'express'
import response from '../libs/responses'
import User, { IUser } from '../models/user'
import Roles from '../models/roles'
import Son from '../models/sons'

class Users {
  constructor() {

  }

  async getUsers(req: Request, res: Response): Promise<void> {
    const users = await User.find().populate('sons', 'firstName lastName dni -_id').populate('roles','name -_id')
    response.success(req, res, users, 'List of users', 200)
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params

    const userExist = await User.findById(req.userId)
    if(!userExist) return response.error(req, res, 'User Not Found', 400)
    if(userExist?.username !== username) return response.error(req, res, 'You are no allow to do this action', 400)

    const user = await User.findOne({ username }).populate('sons', 'firstName lastName dni -_id').populate('roles','name -_id')
    const data = [user]
    response.success(req, res, data, 'User found', 200)
  }

  async getSonsByUsername(req: Request, res: Response): Promise<void> {
    const user = await User.findById(req.userId).populate('sons', 'firstName lastName dni -_id')
    if(!user) response.error(req, res, 'User Not Found', 400)
    if(user){
      if(user.username !== req.params.username) response.error(req, res, 'You can not do this action', 400)

      const sonsList = user.sons
      response.success(req, res, sonsList, `List of ${user.username} sons`, 200)
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, dni, email, password, username, roles } = req.body
    const newUser: IUser = new User({
      firstName,
      lastName,
      dni,
      email,
      password,
      username
    })

    newUser.password = await newUser.encryptPassword(newUser.password)

    if(roles) {
      const foundRoles = await Roles.find({name:{$in:roles}})
      newUser.roles = foundRoles.map( (role: { _id: any }) => role._id )
    }else {
      const role = await Roles.findOne({name:"user"})
      newUser.roles = [role._id]
    }

    await newUser.save()
    response.success(req, res, newUser, 'User Created', 201)
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params
    const { firstName, lastName, dni, email, password } = req.body
    
    const userExist = await User.findById(req.userId)
    const sonExist = await Son.findOne({_id:{$in:userExist?.sons}})

    if( sonExist.firstName === username ) console.log(`${username} es hijo de ${userExist?.username}`)
    if(!userExist) return response.error(req, res, 'User Not Found', 400)

    if(userExist?.username !== username && sonExist.firstName !== username ) return response.error(req, res, 'You are no allow to do this action', 400)

    const user = await User.findOneAndUpdate(
      { username }, 
      { 
        firstName, 
        lastName, 
        dni, 
        email, 
        password: await userExist?.encryptPassword(password)
      }, 
      { new: true }
    )
    const data = [user]

    response.success(req, res, data, 'User Updated', 201)
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params
    const user = await User.findOneAndDelete({ username })
    const data = [user]
    response.success(req, res, data, 'User Deleted', 200)
  }

}

const user = new Users
export default user