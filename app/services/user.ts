import { hash, compare } from 'bcrypt';
import Logger from '../utils/logger';
import User from '../models/user';
import Session from '../models/session';
import BoardService from './board';
import { v4 as uuid } from 'uuid';

const authorize = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  
  if (compare(password, (<any>user).password)) {
    return user;
  }

  return null;
}

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

  async createSession(email, password) {
    try {
      email = `${email}`.toLocaleLowerCase();
      password = password || '';

      const user = await authorize(email, password);
      const createdAt = new Date();
      const token = uuid();

      const session = await Session.create({ createdAt, token, userId: (<any>user).id });
      this.logger.info('Session created', { email });

      return session;
    } catch (error) {
      this.logger.error(error, { email });
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