function socketHandler(Game, socket) {
  console.log('new user has connected');

  //receives json file containing username string
  socket.on('join', ({ username }) => {
    Game.addPlayer(socket.id, 'test');
  });

  /** receives dir json file containing x and y direction
   *  directions can be positive, 0, negative
   **/
  socket.on('movement', (dir = { dirX, dirY }) => {
    Game.handleMovement(socket.id, dir);
  });

  socket.on('disconnect', () => {
    console.log('user has disconnected');
    Game.removePlayer(socket.id);
  });
}

module.exports = socketHandler;
