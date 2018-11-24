import { expect } from 'chai';
import boardResponse from './board';
import 'mocha';

describe('boardResponse', () => {

  it('has correct values', () => {
    const board = {
      id: '1',
      columns: ['a', 'b'],
      swimLanes: ['c', 'd'],
      userId: '127'
    };
    const result = boardResponse(board);
    
    expect(result).to.eql({
      id: '1',
      columns: ['a', 'b'],
      swimLanes: ['c', 'd'],
      user: '127'
    });
  });
});