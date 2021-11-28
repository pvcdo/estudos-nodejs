const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('vai', () => {
  console.log('Durante')
})

console.log('Antes')

eventEmitter.emit('vai')

console.log('Depois')