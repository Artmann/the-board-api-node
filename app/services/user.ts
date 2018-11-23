import { hash } from 'bcrypt';
import Logger from '../utils/logger';
import User from '../models/user';

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

      return user;
    } catch (error) {
      this.logger.error(error);
    }

    return null;
  }

  async find(id: string) {
    try {
      const user = await User.findById(id);

      return user;
    } catch (error) {
      this.logger.error(error);
    }

    return null;
  }
}