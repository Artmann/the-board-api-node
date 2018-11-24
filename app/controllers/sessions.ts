import { Request, Response } from 'express';
import Logger from '../utils/logger';
import UserService from '../services/user';

class Sessions {
  constructor(private userService: UserService) {}

  async create(request: Request, response: Response) {
    const { email, password } = request.body;
   
    const session = await this.userService.createSession(email, password);
    if (session) {
      return response.send({ session });
    }

    response.status(301).send();
  }
}

const logger = new Logger();

export default new Sessions(
  new UserService(logger)
);
