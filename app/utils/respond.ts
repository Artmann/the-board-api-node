
const respond = (key: string, fn: Function, collection, ...params): Object => {
  const response = {};

  response[key] = Array.isArray(collection) ? collection.map(c => fn(c, ...params)) : fn(collection, ...params);

  return response;
};

export default respond;