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
    /**
     * @swagger
     * components:
     *  schemas:
     *    Users:
     *      type: object
     *      properties:
     *        id:
     *          type: string
     *          description: the auto-generated id of user
     *        firstName:
     *          type: string
     *          description: first name of the user
     *        lastName:
     *          type: string
     *          description: last name of the user
     *        dni:
     *          type: string
     *          description: user's identification number 
     *        email:
     *          type: string
     *          description: users' email
     *        password:
     *          type: string
     *          description: user's password
     *        username:
     *          type: string
     *          description: user's username
     *      required:
     *        - firstName
     *        - lastName
     *        - dni
     *        - email
     *        - password
     *        - username
     *      example:
     *        id: 60f373808c6f2a318ce629ea
     *        firstName: admin
     *        lastName: admin
     *        dni: "123456789"
     *        password: password
     *        username: admin
     */

    /**
     * @swagger
     * tags:
     *  name: Users
     *  description: Endpoints
     */

    /**
     * @swagger
     * /api/users:
     *  get:
     *    summary: Return the Users list
     *    tags: [Users]
     *    responses:
     *      200:
     *        description: The users list
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Users'
     */

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