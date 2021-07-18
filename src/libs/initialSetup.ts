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
      new Sons({ firstName: 'childOne', lastName: 'lastNameOne', dni: '456789123' }).save(),
      new Sons({ firstName: 'childTwo', lastName: 'lastNameTwo', dni: '987654321' }).save(),
    ])

    const usersCounter = await User.estimatedDocumentCount()

    if(usersCounter > 0) return

    const userRole = await Roles.findOne({ name: "user" })
    const adminRole = await Roles.findOne({ name: "admin" })

    let user: IUser = new User({ firstName: 'admin', lastName: 'admin', dni: '123456789', email: 'admin@gmail.com' })
    user.password = await user.encryptPassword('password')
    user.username = 'admin'
    user.sons = [sons[0]['id'], sons[1]['id']]
    user.roles = [adminRole._id]
    await user.save()
    
    let userSonOne: IUser = new User({ firstName:sons[0]['firstName'] , lastName: sons[0]['lastName'] , dni: sons[0]['dni'], email: 'childOne@gmail.com' })
    userSonOne.password = await user.encryptPassword(sons[0]['dni'])
    userSonOne.username = 'childOne'
    userSonOne.sons = []
    userSonOne.roles = [userRole._id]
    await userSonOne.save()

    let userSonTwo: IUser = new User({ firstName: sons[1]['firstName'], lastName: sons[1]['lastName'], dni: sons[1]['dni'], email: 'childTwo@gmail.com' })
    userSonTwo.password = await user.encryptPassword(sons[1]['dni'])
    userSonTwo.username = 'childTwo'
    userSonTwo.sons = []
    userSonTwo.roles = [userRole._id]
    await userSonTwo.save()

    
  } catch (error) {
    console.error(error)
  }
}