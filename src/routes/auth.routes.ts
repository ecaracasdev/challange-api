import { Router } from 'express'

import auth from '../controller/auth.controller'
import { tokenValidation } from "../middlewares"

class AuthRoutes {

  router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes() {
    this.router.post('/signup', auth.signup)
    this.router.post('/login', auth.login)
    this.router.get('/profile', tokenValidation, auth.profile)
  }

}

const authRoutes = new AuthRoutes()
authRoutes.routes()

export default authRoutes.router