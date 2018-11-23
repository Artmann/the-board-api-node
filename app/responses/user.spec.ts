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
      email: 'email',
      name: 'name'
    });
  });

});