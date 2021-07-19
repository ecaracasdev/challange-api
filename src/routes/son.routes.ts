import { Router } from 'express'

import son from '../controller/son.controller'
import { tokenValidation, isAdmin, isValidId } from "../middlewares"
class SonRoutes {

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
     *    Sons:
     *      type: object
     *      properties:
     *        id:
     *          type: string
     *          description: the auto-generated id of son
     *        firstName:
     *          type: string
     *          description: first name of the son
     *        lastName:
     *          type: string
     *          description: last name of the son
     *        dni:
     *          type: string
     *          description: son's identification number 
     *      required:
     *        - firstName
     *        - lastName
     *        - dni
     *      example:
     *        id: 60f373808c6f2a318ce629ea
     *        firstName: sonName
     *        lastName: sonLastName
     *        dni: "123456789"
     *  parameters:
     *    userName:
     *      in: path
     *      name: username
     *      required: true
     *      schema:
     *        type: string
     *      description: Username as a parameter
     *    sonId:
     *      in: path
     *      name: id
     *      required: true
     *      schema:
     *        type: string
     *      description: son's id as a parameter  
     *    limit:
     *      in: path
     *      name: limit
     *      required: true
     *      schema:
     *        type: string
     *        description: request paramater for established a limit 
     *        
     */

    /**
     * @swagger
     * tags:
     *  name: Sons
     */


    /**
     * @swagger
     * /api/sons:
     *  get:
     *    security: 
     *      - bearerAuth: []
     *    tags: [Sons]
     *    responses:
     *      200:
     *        description: Sons list
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Sons'
     */
    this.router.get('/', [tokenValidation, isAdmin], son.getSons)

    /**
     * @swagger
     * /api/sons/{id}:
     *  get:
     *    security: 
     *      - bearerAuth: []
     *    summary: Get son by id
     *    tags: [Sons]
     *    parameters:
     *      - $ref: '#/components/parameters/sonId'
     *    responses:
     *      200:
     *        description: Get Son by id
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Sons'
     */
    this.router.get('/:id', [tokenValidation, isValidId, isAdmin], son.getSon)

    /**
     * @swagger
     * /api/sons/{limit}/sonslist:
     *  get:
     *    security: 
     *      - bearerAuth: []
     *    summary: Get a son's list by limit
     *    tags: [Sons]
     *    parameters:
     *      - $ref: '#/components/parameters/limit'
     *    responses:
     *      200:
     *        description: List of sons by limit param
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Sons'
     */
    this.router.get('/:limit/sonslist', [tokenValidation, isAdmin], son.getSonListByLimit)

    /**
     * @swagger
     * /api/sons:
     *  post:
     *   security:
     *    - bearerAuth: []
     *   summary: Create a new son and also a new users for that son and assigned to the user who create it
     *   tags: [Sons]
     *   requestBody:
     *    required: true
     *    content:
     *      application/json:
     *        schema:
     *          type: object
     *          properties:
     *            firstName:
     *              type: string
     *              default: sonName
     *            lastName:
     *              type: string
     *              default: sonLastName
     *            dni:
     *              type: string
     *              default: "123456789"
     *   responses:
     *    200:
     *      description: This is the default response for son creation
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Sons'
     *    400:
     *      description: This is the default responses error for son creation
     * 
     */
    this.router.post('/', [tokenValidation, isAdmin], son.createSon)

    /**
     * @swagger
     * /api/sons/{id}:
     *  put:
     *   security:
     *    - bearerAuth: []
     *   summary: Update son's data for the logged user
     *   tags: [Sons]
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
     *              default: newSonName
     *            lastName:
     *              type: string
     *              default: newSonLastName
     *            dni:
     *              type: string
     *              default: "20095962"
     *   responses:
     *    200:
     *      description: This is the default response for sons update
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Sons'
     *    400:
     *      description: This is the default responses error for son update
     * 
     */
    this.router.put('/:id', [tokenValidation, isValidId, isAdmin], son.updateSon)

    /**
     * @swagger
     * /api/sons/{id}:
     *  delete:
     *    security: 
     *      - bearerAuth: []
     *    summary: Delete user's son by id
     *    tags: [Sons]
     *    parameters:
     *      - $ref: '#/components/parameters/sonId'
     *    responses:
     *      200:
     *        description: Delete Son
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Sons'
     */
    this.router.delete('/:id', [tokenValidation, isValidId, isAdmin], son.deleteSon)
  }

}

const sonRoutes = new SonRoutes
export default sonRoutes.router