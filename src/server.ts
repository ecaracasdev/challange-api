import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression"
import cors from "cors"
import dotenv from "dotenv"

//swagger
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import { options } from "./swaggerOptions";

import userRoutes from "./routes/user.routes"
import sonRoutes from "./routes/son.routes"
import auth from "./routes/auth.routes"
import connectDb from './database'
import config from "./config"
import { createRoles, createSons } from "./libs/initialSetup"

class Server {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  config() {

    //initialization 
    dotenv.config()
    connectDb(config.db.url)
    createRoles()
    createSons()

    this.app.set('port', config.port )
    
    //middlewares
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended:false}))
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(cors())


  }

  routes() {
    const specs = swaggerJsDoc(options)

    this.app.use('/api/auth',auth)
    this.app.use('/api/users',userRoutes)
    this.app.use('/api/sons',sonRoutes)

    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server listening on port ${this.app.get('port')}`)
    })
  }
}

const server = new Server()
server.start()