import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";

import indexRoutes from './routes/indexRoutes';
import userRoutes from "./routes/userRoutes";
import sonRoutes from "./routes/sonRoutes";

class Server {
  public app: express.Application

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    const MONGO_URI = 'mongodb://localhost/challangeapi';
    mongoose.set('useFindAndModify', true);
    mongoose.connect( process.env.MONGODB_URL || MONGO_URI , {
      useNewUrlParser:true,
      useCreateIndex:true,
      useUnifiedTopology:true,
      useFindAndModify:false
    })
      .then( db => console.log('DB is connected'));
    
    this.app.set('port', process.env.PORT || 3000);
    //middlewares
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:false}))
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }

  routes() {
    this.app.use(indexRoutes);
    this.app.use('/api/sons',sonRoutes);
    this.app.use('/api/users',userRoutes);
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server listening on port ${this.app.get('port')}`);
    });
  }
}

const server = new Server()
server.start()