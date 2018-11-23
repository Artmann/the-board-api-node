interface Route {
  className: string;
  func: string;
  method: string;
  path: string;
}

export default class Router {
  public routes: Array<Route>; 

  constructor() {
    this.routes = [];
  }

  define(method: string, path: string, className: string, func: string): Router {
    this.routes.push({ method, path, className, func });

    return this;
  }
}
