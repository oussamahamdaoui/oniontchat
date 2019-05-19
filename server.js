const app = require('express')();
const http = require('http');
const socketio = require('socket.io');
let port = process.env.PORT;

if (port == null || port == "") {
  port = 8000;
}

try {

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

console.log('create server')
const server = http.createServer(app);
const io = socketio.listen(server, {log:false, origins:'*:*'});

io.on('connection', (socket) => {
socket.on('message', (msg) => {
socket.broadcast.emit('message', msg);
});
});

server.listen(port);

console.log('server start on port')

}catch(err) {console.log('error')}