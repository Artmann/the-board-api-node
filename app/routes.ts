import Router from './router';

const router = new Router();

router
  .define('GET', '/users/:id', 'users', 'show')
  .define('POST', '/users', 'users', 'create');

router
  .define('POST', '/sessions', 'sessions', 'create');

export default router;
