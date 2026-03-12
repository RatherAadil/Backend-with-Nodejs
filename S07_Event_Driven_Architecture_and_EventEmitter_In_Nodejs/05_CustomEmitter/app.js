class Emitter {
  constructor() {
    this._events = {};
  }
  on(event, callback) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(callback);
  }
  emit(userEvent, ...args) {
    if (this._events[userEvent]) {
      const events = this._events[userEvent];
      events.forEach((event) => {
        event(...args);
      });
    } else {
      console.log(`No Event named ${userEvent} Present`);
      return;
    }
  }
  off(eventName, listener) {
    if (!this._events[eventName]) return;
    if (this._events[eventName]) {
      const index = this._events[eventName].indexOf(listener);
      console.log({ index });
      if (index !== -1) {
        this._events[eventName].splice(index, 1);
      }
    }
  }

  once(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const addListener = (...args) => {
      listener(...args);
      this.off(eventName, addListener);
    };

    this.on(eventName, addListener);
  }
}

const MyEmiter = new Emitter();
MyEmiter.on('abc', () => {
  console.log('hello from ABC');
});
MyEmiter.on('abc', () => {
  console.log('hello from ABC');
});

MyEmiter.once('abc', () => {
  console.log('Hello once');
});
MyEmiter.emit('abc');
