import { expect } from 'chai';
import userResponse from './user';
import 'mocha';

describe('userResponse', () => {

  it('has correct values', () => {
    const user = {
      id: '1',
      email: 'email',
      name: 'name',
      password: 'password'
    };
    const result = userResponse(user);
    
    expect(result).to.eql({
      id: '1',
      boards: [],
      email: 'email',
      name: 'name'
    });
  });

  it('includes boards', () => {
    const user = {
      id: '1',
      email: 'email',
      name: 'name'
    };
    const boards = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]

    const result = userResponse(user, boards);
    
    expect(result.boards).to.eql([1, 2, 3]);
  });
});