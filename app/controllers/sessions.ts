import { Request, Response } from 'express';
import Logger from '../utils/logger';
import UserService from '../services/user';

class Sessions {
  constructor(private userService: UserService) {}

  async create(request: Request, response: Response) {
    const { email, password } = request.body;
   
    const session = { token: '123' };
    
    response.send({ session });
  }
}

const logger = new Logger();

export default new Sessions(
  new UserService(logger)
);
