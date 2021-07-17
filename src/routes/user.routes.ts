import { Router } from 'express'

import user from '../controller/user.controller'
import { tokenValidation, isAdmin, isUserOrAdmin } from "../middlewares"

class UserRoutes {

  router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes() {
    this.router.get('/',[tokenValidation, isAdmin], user.getUsers)
    this.router.get('/:username',[tokenValidation, isUserOrAdmin], user.getUser)
    this.router.get('/:username/sons',[tokenValidation, isAdmin], user.getSonsByUsername)
    this.router.post('/', [tokenValidation, isAdmin], user.createUser)
    this.router.put('/:username',[tokenValidation, isAdmin], user.updateUser)
    this.router.delete('/:username', [tokenValidation, isAdmin], user.deleteUser)
  }

}

const userRoutes = new UserRoutes
export default userRoutes.router