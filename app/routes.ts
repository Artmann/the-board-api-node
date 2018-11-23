import Router from './router';

const router = new Router();

router
  .define('GET', '/users/:id', 'users', 'show')
  .define('POST', '/users', 'users', 'create');

export default router;
