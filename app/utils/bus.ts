class EventBus {
  private listeners: object;

  constructor() {
    this.listeners = {};
  }

  dispatch(name: string, payload: object) {
    (this.listeners[name] || []).forEach(fn => fn(payload));
  }

  on(name: string, fn: Function) {
    if (!(name in this.listeners)) {
      this.listeners[name] = [];
    }

    this.listeners[name].append(fn);
  }
}

export default new EventBus();