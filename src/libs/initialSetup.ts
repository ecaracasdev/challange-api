import Roles from "../models/roles"
import Sons from "../models/sons"
import User, { IUser } from "../models/user"

export const createRoles = async () => {
  try {
    const count = await Roles.estimatedDocumentCount()

    if (count > 0) return

    const values = await Promise.all([
      new Roles({ name: 'user' }).save(),
      new Roles({ name: 'moderator' }).save(),
      new Roles({ name: 'admin' }).save()
    ])

  } catch (error) {
    console.error(error)
  }
}

export const createSons = async () => {
  try {
    const sonsCounter = await Sons.estimatedDocumentCount()

    if (sonsCounter > 0) return

    const sons = await Promise.all([
      new Sons({ firstName: 'priscilla', lastName: 'Caracas', dni: '123456789' }).save(),
      new Sons({ firstName: 'teresa', lastName: 'Caracas', dni: '987654321' }).save(),
    ])

    const usersCounter = await User.estimatedDocumentCount()

    if(usersCounter > 0) return

    const userRole = await Roles.findOne({ name: "user" })
    const adminRole = await Roles.findOne({ name: "admin" })

    let user: IUser = new User({ firstName: 'elias', lastName: 'Caracas', dni: '96030576', email: 'saile.caracas@gmail.com' })
    user.password = await user.encryptPassword('password')
    user.username = 'ecaracas'
    user.sons = [sons[0]['id'], sons[1]['id']]
    user.roles = [adminRole._id]
    await user.save()
    
    let userSonOne: IUser = new User({ firstName:sons[0]['firstName'] , lastName: sons[0]['lastName'] , dni: '123456789', email: 'son1@gmail.com' })
    userSonOne.password = await user.encryptPassword('123456789')
    userSonOne.username = 'ecaracas'
    userSonOne.sons = []
    userSonOne.roles = [userRole._id]
    await userSonOne.save()

    let userSonTwo: IUser = new User({ firstName: sons[1]['firstName'], lastName: sons[1]['lastName'], dni: '987654321', email: 'son2@gmail.com' })
    userSonTwo.password = await user.encryptPassword('987654321')
    userSonTwo.username = 'ecaracas'
    userSonTwo.sons = []
    userSonTwo.roles = [userRole._id]
    await userSonTwo.save()

  } catch (error) {
    console.error(error)
  }
}