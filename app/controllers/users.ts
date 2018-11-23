import { Request, Response } from 'express';
import Logger from '../utils/logger';
import User from '../models/user';
import UserService from '../services/user';

class Users {
  constructor(private userService: UserService) {}

  async create(request: Request, response: Response) {
    const { email, name, password } = request.body;
    
    if (!email || !email.includes('@')) {
      return response.status(400).send({ error: 'email is required' });
    }
    
    if (!password) {
      return response.status(400).send({ error: 'password is required' });
    }

    const user = await this.userService.create(email, password, name); 

    if (!user) {
      return response.status(500).send({ error: 'Could not create user' });
    }

    response.send({ user });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    
    const user = await this.userService.find(id);

    if (!user) {
      return response.status(404).send();
    }

    response.send({ user });
  }

}

export default new Users(new UserService(new Logger()));