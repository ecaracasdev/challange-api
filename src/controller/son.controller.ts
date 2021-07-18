import { Request, Response } from 'express'
import config from '../config'
import response from '../libs/responses'
import Roles from '../models/roles'
import Son from '../models/sons'
import User from '../models/user'


class Sons {

  async getSons(req: Request, res: Response): Promise<void> {
    const sons = await Son.find()
    response.success(req, res, sons, config.messages.sonsList, 200)
  }

  async getSon(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const son = await Son.findById(id)
    if (!son) return response.error(req, res, config.messages.sonByidNotFound, 400)
    response.success(req, res, son, config.messages.sonFound, 200)
  }

  async getSonListByLimit(req: Request, res: Response): Promise<void> {
    const sons = await Son.find().limit(10)

    response.success(req, res, sons, config.messages.listSonLimit, 200)
  }

  async createSon(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, dni } = req.body
    const newSon = new Son({ firstName, lastName, dni })
    await newSon.save()

    const newUser = new User({
      firstName,
      lastName,
      dni,
      email: `${firstName}@mail.com`,
      username: `${firstName}${lastName}`,
    })

    newUser.password = await newUser.encryptPassword(dni)
    const role = await Roles.findOne({ name: "user" })
    newUser.roles = [role._id]
    await newUser.save()

    const father_user = await User.findById(req.userId)

    if (father_user) {
      father_user.sons.push(newSon.id)
      await father_user.save()
    }
    const data = { "newSon": newSon, "newUser": newUser }
    response.success(req, res, data, config.messages.sonCreated, 201)
  }

  async updateSon(req: Request, res: Response): Promise<void> {
    const { dni } = req.params
    const son = await Son.findOneAndUpdate({ dni }, req.body, { new: true })
    response.success(req, res, son, config.messages.sonUpdated, 201)
  }

  async deleteSon(req: Request, res: Response): Promise<void> {
    const { url } = req.params
    const son = await Son.findOneAndDelete({ url })
    response.success(req, res, son.firstName, 'Son Deleted', 200)
  }

}

const son = new Sons
export default son