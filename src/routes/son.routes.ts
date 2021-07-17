import { Router } from 'express'

import son from '../controller/son.controller'
import { tokenValidation, isAdmin } from "../middlewares"
class SonRoutes {

  router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes() {
    this.router.get('/',[tokenValidation, isAdmin], son.getSons)
    this.router.get('/:dni',[tokenValidation, isAdmin], son.getSon)
    this.router.get('/:username/sonslist',[tokenValidation, isAdmin], son.getSonListByLimit)
    this.router.post('/',[tokenValidation, isAdmin], son.createSon)
    this.router.put('/:dni',[tokenValidation, isAdmin], son.updateSon)
    this.router.delete('/:dni',[tokenValidation, isAdmin], son.deleteSon)
  }

}

const sonRoutes = new SonRoutes
export default sonRoutes.router