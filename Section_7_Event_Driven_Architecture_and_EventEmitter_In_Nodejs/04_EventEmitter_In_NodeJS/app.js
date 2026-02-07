import EventEmitter from 'events';

const emitter = new EventEmitter();
emitter.setMaxListeners(2, 'abc');

emitter.on('abc', () => {
  console.log('abc event 1 fired...');
});
emitter.on('abc', () => {
  console.log('abc event 2 fired...');
});

emitter.emit('abc');
emitter.emit('abc');
// console.log(emitter.emit('abc'));
