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
}

const responses = new Responses;
export default responses;