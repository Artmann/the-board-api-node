import * as express from 'express';
import * as bodyParser from 'body-parser';
import { config } from 'dotenv';
import * as mongoose from 'mongoose';
import router from './routes';
import users from './controllers/users';

class App {
  public app: express.Application;

  private container: Object;

  constructor() {
    config();

    this.container = {};
    this.container["users"] = users;

    this.app = express();
    
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.database();
    this.routes();
  }

  private database(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/the-board');
  }

  private routes(): void {
    router.routes.forEach(route => {
      const instance = this.container[route.className];
      this.app[route.method.toLocaleLowerCase()](route.path, instance[route.func].bind(instance));
    });
  }
}

export default new App().app;
