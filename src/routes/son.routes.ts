import { Router } from 'express'

import son from '../controller/son.controller'
class SonRoutes {

  router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes() {
    this.router.get('/', son.getSons)
    this.router.get('/:dni', son.getSon)
    this.router.post('/', son.createSon)
    this.router.put('/:dni', son.updateSon)
    this.router.delete('/:dni', son.deleteSon)
  }

}

const sonRoutes = new SonRoutes
export default sonRoutes.router