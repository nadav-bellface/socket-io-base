const http = require('http');
const app = require('express')();

let httpServer = http.createServer(app).listen();
let io = require('socket.io')(httpServer);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //console.log(socket.handshake.headers);

    socket.on('message', function(msg){
        if (msg == 'Bell') io.to(socket.id).emit('response-message', 'Face');
        else io.emit('response-message', msg);
      });
      
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

exports.server = httpServer;
exports.io = io;