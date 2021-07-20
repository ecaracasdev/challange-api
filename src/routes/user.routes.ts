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
     *  parameters:
     *    userName:
     *      in: path
     *      name: username
     *      required: true
     *      schema:
     *        type: string
     *      description: Username as a parameter
     *    userId:
     *      in: path
     *      name: id
     *      required: true
     *      schema:
     *        type: string
     *      description: Username as a parameter
     *        
     */

    /**
     * @swagger
     * tags:
     *  name: Users
     */

    /**
     * @swagger
     * /api/users:
     *  get:
     *    security: 
     *      - bearerAuth: []
     *    summary: Get the Users list
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

    this.router.get('/', [tokenValidation, isAdmin], user.getUsers)

    /**
     * @swagger
     * /api/users/{username}:
     *  get:
     *    security: 
     *      - bearerAuth: []
     *    summary: Get user by username
     *    tags: [Users]
     *    parameters:
     *      - $ref: '#/components/parameters/userName'
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

    this.router.get('/:username', [tokenValidation, isUserOrAdmin], user.getUser)

    /**
     * @swagger
     * /api/users/{username}/sons:
     *  get:
     *    security: 
     *      - bearerAuth: []
     *    summary: Get the sons of the requiered username
     *    tags: [Users]
     *    parameters:
     *      - $ref: '#/components/parameters/userName'
     *    responses:
     *      200:
     *        description: User
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Users'
     */
    this.router.get('/:username/sons', [tokenValidation, isAdmin], user.getSonsByUsername)

    /**
     * @swagger
     * /api/users:
     *  post:
     *   security:
     *    - bearerAuth: []
     *   summary: Create a new user only if you are login
     *   tags: [Users]
     *   requestBody:
     *    required: true
     *    content:
     *      application/json:
     *        schema:
     *          type: object
     *          properties:
     *            firstName:
     *              type: string
     *              default: userExample
     *            lastName:
     *              type: string
     *              default: userExample
     *            email:
     *              type: string
     *              default: userExample@mail.com
     *            dni:
     *              type: string
     *              default: "123456789"
     *            password:
     *              type: string
     *              default: password
     *            username:
     *              type: string
     *              default: userExample
     *            roles:
     *              type: array
     *              default: ["user"]
     *   responses:
     *    200:
     *      description: This is the default response for user creation
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Users'
     *    400:
     *      description: This is the default responses error for user creation
     * 
     */
    this.router.post('/', [tokenValidation, isAdmin], user.createUser)

    /**
     * @swagger
     * /api/users/{id}:
     *  put:
     *   security:
     *    - bearerAuth: []
     *   summary: Update user's data 
     *   tags: [Users]
     *   parameters:
     *    - $ref: '#/components/parameters/sonId'
     *   requestBody:
     *    required: true
     *    content:
     *      application/json:
     *        schema:
     *          type: object
     *          properties:
     *            firstName:
     *              type: string
     *            lastName:
     *              type: string
     *            email:
     *              type: string
     *            dni:
     *              type: string
     *            password:
     *              type: string
     *            username:
     *              type: string
     *            
     *   responses:
     *    200:
     *      description: This is the default response for sons update
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Users'
     *    400:
     *      description: This is the default responses error for son update
     * 
     */
    this.router.put('/:id', [tokenValidation, isAdmin], user.updateUser)

    /**
     * @swagger
     * /api/users/{username}:
     *  delete:
     *    security: 
     *      - bearerAuth: []
     *    summary: Delete user by username
     *    tags: [Users]
     *    parameters:
     *      - $ref: '#/components/parameters/userName'
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
    this.router.delete('/:username', [tokenValidation, isAdmin], user.deleteUser)
  }

}

const userRoutes = new UserRoutes
export default userRoutes.router