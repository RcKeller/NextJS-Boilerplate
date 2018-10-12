const SocketIO = require('socket.io')

/*
WEB SOCKETS
*/
module.exports = (server, config) => {
  // https://socket.io/docs/#Using-with-Express
  const io = SocketIO(server)
  io.on('connection', function (socket) {
    socket.emit('news', {
      hello: 'world'
    })
    socket.on('my other event', function (data) {
      console.log(data)
    })
  })
}
