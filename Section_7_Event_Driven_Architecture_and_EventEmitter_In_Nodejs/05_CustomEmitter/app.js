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
}
const MyEmiter = new Emitter();
MyEmiter.on('abc', () => {
  console.log('hello from ABC');
});
MyEmiter.on('abc', () => {
  console.log('hello from ABC');
});

MyEmiter.once('abc');
