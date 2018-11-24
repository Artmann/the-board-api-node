import { Request, Response } from 'express';
import Logger from '../utils/logger';
import BoardService from '../services/board';
import respond from '../utils/respond';
import boardResponse from '../responses/board';

class Boards {
  constructor(private boardService: BoardService) {}

  async index(request: Request, response: Response) {
    const { user: { id } } = (<any>request);
    const boards = await this.boardService.findByUserId(id);

    response.send(respond('boards', boardResponse, boards));
  }
  
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const { user: { id: userId } } = (<any>request);
    const boards = await this.boardService.findByUserId(userId);
    const board = boards.find(b => b.id === id)

    if (!board) {
      return response.status(404).send();
    }

    response.send(respond('board', boardResponse, boards));
  }
}

const logger = new Logger();

export default new Boards(
  new BoardService(logger)
);
