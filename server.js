const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 5000;
const math = require('mathjs');

app.use(express.static(`${__dirname}/client/public`));



io.on('connection', (socket) => {
  console.log('someone connected')
  socket.emit('newClientConnected', socket.id);

  socket.on('doTheMath', (calc) => {
    console.log(socket.id);
    console.log(calc);
    let result = math.eval(calc);
    console.log(result)
    let stringToReturn = calc + ' = ' + result;
    socket.emit('completeCalc', stringToReturn);
    socket.emit('result', result);
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});