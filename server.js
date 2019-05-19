const app = require('express')();
const http = require('http');
const socketio = require('socket.io');


app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
});

const server = http.createServer(app);
const io = socketio.listen(server, {log:false, origins:'*:*'});

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});

server.listen(5000);