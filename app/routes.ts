import Router from './router';

const router = new Router();

router
  .define('GET', '/boards', 'boards', 'index')
  .define('GET', '/boards/:id', 'boards', 'show');

router
  .define('POST', '/sessions', 'sessions', 'create');

router
  .define('GET', '/users/:id', 'users', 'show')
  .define('POST', '/users', 'users', 'create');

export default router;
