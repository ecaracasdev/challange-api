import { Request, Response, Router } from 'express'

import Son from '../models/sons'
import User from '../models/user'
import response from '../network/responses';

class SonRoutes {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async getSons(req: Request, res: Response):Promise<void> {
    const sons = await Son.find();
    response.success(req, res, sons, 'List of sons', 200)
  }

  public async getSon(req: Request, res: Response): Promise<void>  {
    const { dni } = req.params;
    const son = await Son.findOne({dni});
    response.success(req, res, son, 'Son found', 200)
  }

  public async createSon(req: Request, res: Response): Promise<void>  {
    const {firstName, lastName, dni, email, password, username } = req.body;
    const newSon = new Son({firstName, lastName, dni });
    await newSon.save();

    const newUser = new User({
      firstName,
      lastName,
      dni,
      email,
      password,
      username
    });
    
    await newUser;

    const data = {"newSon":newSon, "newUser":newUser}
    response.success(req, res, data, 'Son Created and registered as User', 201)
  }

  public async updateSon(req: Request, res: Response): Promise<void>  {
    const { dni } = req.params;
    const son = await Son.findOneAndUpdate({dni}, req.body, {new: true});
    response.success(req, res, son, 'Son Updated', 201)
  }

  public async deleteSon(req: Request, res: Response): Promise<void>  {
    const { url } = req.params
    const son = await Son.findOneAndDelete({url})
    response.success(req, res, son.firstName, 'Son Deleted', 200)
  }

  routes() {
    this.router.get('/', this.getSons)
    this.router.get('/:dni', this.getSon)
    this.router.post('/', this.createSon)
    this.router.put('/:dni', this.updateSon)
    this.router.delete('/:dni', this.deleteSon)
  }

}

const sonRoutes = new SonRoutes;
export default sonRoutes.router;