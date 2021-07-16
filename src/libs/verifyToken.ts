import { Request, Response, NextFunction } from "express";
import response from "../network/responses";
import jwt from "jsonwebtoken";

interface Ipaylaod {
  _id: string;
  iat: number;
  exp: number;
}
export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
 
  let token:string = req.header('auth-token') || ''
  if(!token) response.error(req, res, 'Access denied', 400)
  
  const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as Ipaylaod
  //declaration merging
  req.userId = payload._id;

  next();
}