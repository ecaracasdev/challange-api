import { Request, Response, Router } from 'express'

import User from '../models/user';
import response from '../network/responses';

class UserRoutes {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async getUsers(req: Request, res: Response):Promise<void> {
    const users = await User.find().populate('sons','firstName lastName dni -_id');
    response.success(req, res, users, 'List of users', 200)
  }

  public async getUser(req: Request, res: Response): Promise<void>  {
    const { username } = req.params;
    const user = await User.findOne({username}).populate('sons','firstName lastName dni -_id');
    const data = [user]
    response.success(req, res, data, 'User found', 200)
  }

  public async createUser(req: Request, res: Response): Promise<void>  {
    const {firstName, lastName, dni, email, password, username } = req.body;
    const newUser = new User({firstName, lastName, dni, email, password, username });
    await newUser.save();
    response.success(req, res, newUser, 'User Created', 201)
  }

  public async updateUser(req: Request, res: Response): Promise<void>  {
    const { username } = req.params;
    const user = await User.findOneAndUpdate({username}, req.body, {new: true});
    const data = [user]
    response.success(req, res, data , 'User Updated', 201)
  }

  public async deleteUser(req: Request, res: Response): Promise<void>  {
    const { username } = req.params
    const user = await User.findOneAndDelete({username})
    const data = [user]
    response.success(req, res, data, 'User Deleted', 200)
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