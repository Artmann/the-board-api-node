import Logger from '../utils/logger';
import Board from '../models/board';

export default class BoardService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async create(userId: string, name: string = 'My board', columns: Array<string> = ['Todo', 'Doing', 'Done'], swimLanes: Array<string> = ['My team']) {
    try {
      const board = await Board.create({ userId, name, columns, swimLanes });
      this.logger.info('Created Board', { userId, name, columns, swimLanes });
      
      return board;
    } catch (error) {
      this.logger.error(error, { name, columns, swimLanes });
    }

    return null;
  }
}