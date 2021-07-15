import { Request, Response, Router } from 'express'

import Son from '../models/sons'
import User from '../models/user'

class SonRoutes {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async getSons(req: Request, res: Response):Promise<void> {
    const sons = await Son.find();
    res.json(sons);
  }

  public async getSon(req: Request, res: Response): Promise<void>  {
    const { dni } = req.params;
    const son = await Son.findOne({dni});
    res.json({data:son});
  }

  public async createSon(req: Request, res: Response): Promise<void>  {
    const {firstName, lastName, dni } = req.body;
    const newSon = new Son({firstName, lastName, dni });
    await newSon.save();

    const newUser = new User({
      name: firstName,
      email: `${firstName}@mail.com`,
      password: dni,
      username: `${firstName}${lastName}`
    });
    
    await newUser;

    res.json({data:{"newSon":newSon, "newUser":newUser}});
  }

  public async updateSon(req: Request, res: Response): Promise<void>  {
    const { dni } = req.params;
    const son = await Son.findOneAndUpdate({dni}, req.body, {new: true});
    res.json({data: son });
  }

  public async deleteSon(req: Request, res: Response): Promise<void>  {
    const { url } = req.params
    const son = await Son.findOneAndDelete({url})
    res.json({data: `${son.firstName} was deleted` });
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