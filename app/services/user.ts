import { hash } from 'bcrypt';
import Logger from '../utils/logger';
import User from '../models/user';
import BoardService from './board';

export default class UserService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async create(email: string, password: string, name: string) {
    try {
      email = email.toLocaleLowerCase();
      
      const userExists = await User.findOne({ email });
      if (userExists) {
        return null;
      }
      
      const hashedPassword = await hash(password, 512);
      const user = await User.create({ email, password: hashedPassword, name });
      this.logger.info('User created', { id: user.id, email, name });

      new BoardService(this.logger).create(user.id);

      return user;
    } catch (error) {
      this.logger.error(error, { email, name });
    }

    return null;
  }

  async find(id: string) {
    try {
      const user = await User.findById(id);

      return user;
    } catch (error) {
      this.logger.error(error, { id });
    }

    return null;
  }
}