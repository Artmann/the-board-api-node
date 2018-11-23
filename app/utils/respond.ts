
const respond = (key: string, collection, fn: Function): Object => {
  const response = {};

  response[key] = Array.isArray(collection) ? collection.map(c => fn(c)) : fn(collection);

  return response;
};

export default respond;