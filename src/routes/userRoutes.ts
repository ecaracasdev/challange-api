import { Request, Response, Router } from 'express'

import User from '../models/user';
import responses from '../responses/responses';

class UserRoutes {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async getUsers(req: Request, res: Response):Promise<void> {
    const users = await User.find().populate('sons','firstName lastName dni -_id');
    res.json(users);

  }

  public async getUser(req: Request, res: Response): Promise<void>  {
    const { username } = req.params;
    const user = await User.findOne({username}).populate('sons','firstName lastName dni -_id');
    res.json({data:user});
  }

  public async createUser(req: Request, res: Response): Promise<void>  {
    const {name, email, password, username } = req.body;
    const newUser = new User({name, email, password, username });
    await newUser.save();
    res.json({data:newUser});
  }

  public async updateUser(req: Request, res: Response): Promise<void>  {
    const { username } = req.params;
    const user = await User.findOneAndUpdate({username}, req.body, {new: true});
    res.json({data: user });
  }

  public async deleteUser(req: Request, res: Response): Promise<void>  {
    const { username } = req.params
    const user = await User.findOneAndDelete({username})
    res.json({data: `The user ${user.name} was deleted` })
  }

  routes() {
    this.router.get('/', this.getUsers)
    this.router.get('/:username', this.getUser)
    this.router.post('/', this.createUser)
    this.router.put('/:username', this.updateUser)
    this.router.delete('/:username', this.deleteUser)
  }

}

const userRoutes = new UserRoutes;
export default userRoutes.router;