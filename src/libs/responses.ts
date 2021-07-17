import { Request, Response } from 'express'

class Responses {
  constructor() {

  }

  
  
  success(req: Request, res: Response,data: Object, message: String, status: number) {
    res.status(status).send({
      status,
      message,
      body: data
    })
  }

  error(req: Request, res: Response, message: String, status: number) {
    res.status(status).send({
      status,
      error: message,
      body:''
    })
  }

  sign_success(req: Request, res: Response,data: Object, message: String, status: number, token: string) {
    if(token) {
      res.header('auth-token',token).status(status).send({
        status,
        message,
        body: data
      })
    }
  }
  
}

const responses = new Responses;
export default responses;