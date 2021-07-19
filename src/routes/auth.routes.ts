import { Router } from 'express'

import auth from '../controller/auth.controller'
import { tokenValidation, validateBody } from "../middlewares"

class AuthRoutes {

  router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes() {
    /**
     * @swagger
     * components:
     *  schemas:
     *    Login:
     *      type: object
     *      properties:
     *        token:
     *          type: string
     *          description: authentication token
     *    Profile:
     *      type: object
     *      properties:
     *        firstName:
     *          type: string
     *        lastName:
     *          type: string
     *        email:
     *          type: string
     *        dni:
     *          type: string
     *        password:
     *          type: string
     *        username:
     *          type: string
     *        roles:
     *          type: array
     */


    /**
     * @swagger
     * /api/auth/signup:
     *  post:
     *   tags: [Auth]
     *   requestBody:
     *    required: true
     *    content:
     *      application/json:
     *        schema:
     *          type: object
     *          properties:
     *            firstName:
     *              type: string
     *              default: userOne
     *            lastName:
     *              type: string
     *              default: userLastNameOne
     *            email:
     *              type: string
     *              default: user@mail.com
     *            dni:
     *              type: string
     *              default: "123456789"
     *            password:
     *              type: string
     *              default: password
     *            username:
     *              type: string
     *              default: admin
     *            roles:
     *              type: array
     *              default: ["admin"]
     *   responses:
     *    200:
     *      description: This is the default response for login
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Profile'
     *    400:
     *      description: This is the default responses error for login
     *      content:
     *        application/json:
     *          schema:
     *          $ref: '#/components/schemas/Error'
     * 
     */

    this.router.post('/signup', validateBody, auth.signup)
    /**
     * @swagger
     * /api/auth/login:
     *  post:
     *   tags: [Auth]
     *   requestBody:
     *    required: true
     *    content:
     *      application/json:
     *        schema:
     *          type: object
     *          properties:
     *            username:
     *              type: string
     *              default: admin
     *            password:
     *              type: string
     *              default: password
     *   responses:
     *    200:
     *      description: This is the default response for login
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Login'
     *    400:
     *      description: This is the default responses error for login
     * 
     */
    this.router.post('/login', auth.login)

    /**
     * @swagger
     * /api/auth/profile:
     *  get:
     *   tags: [Auth]
     *   security:
     *    - bearerAuth: []
     *   responses:
     *    200:
     *      description: This is the default response for login
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Profile'
     *    400:
     *      description: This is the default responses error for login
     * 
     */
    this.router.get('/profile', tokenValidation, auth.profile)
  }

}

const authRoutes = new AuthRoutes()
authRoutes.routes()

export default authRoutes.router