import { Request, Response } from 'express';
import UserService from "../services/user";
import Logger from "../utils/logger";
import { METHODS } from 'http';

const ignoredRoutes = [
  { method: 'post', path: '/sessions' }
];

const auth = (request: Request, response: Response, next: Function) => {
  let ignoreRoute = false;

  ignoredRoutes.forEach(({ method, path }) => {
    if (method.toLowerCase() == request.method.toLowerCase() && path.toLowerCase() === path.toLowerCase()) {
      ignoreRoute = true;
    }
  });

  if (ignoreRoute) {
    return next();
  }
  
  const userService = new UserService(new Logger());
  const token = request.header('Authorization').replace('Bearer ', '');

  userService.authenticate(token).then(user => {
    if (!user) {
      return response.status(401).send();
    }
  
    (<any>request).user = user; 
  
    next();
  });
};

export default auth;