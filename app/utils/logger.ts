export default class Logger {
  info(message, fields: Object = {}) {
    console.log(message, fields);
  }

  error(message, fields: Object = {}) {
    console.error(message, fields);
  }
}