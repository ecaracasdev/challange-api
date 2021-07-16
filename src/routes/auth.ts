import { Router } from 'express'

import auth from '../controller/auth.controller';

class AuthRoutes {
  
  router: Router

  constructor() {
    this.router = Router();
    this.routes();
  }
  
  routes() {
    this.router.post('/signup', auth.signup )
    this.router.post('/login', auth.login )
  }

}

const authRoutes = new AuthRoutes();
authRoutes.routes()

export default authRoutes.router;