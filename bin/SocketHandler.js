const Constant = require('../data/Constant');
const Map = require('../data/Map');

function socketHandler(Game, socket) {
  console.log('new user has connected');

  //receives json file containing username string 
  //and sends gamedata consisting constants and map info
  socket.on(Constant.MSG_TYPES.JOIN_GAME, ({ username }) => {
    socket.emit(Constant.MSG_TYPES.GAME_INFO, {Constant, Map});
    Game.addPlayer(socket.id, 'test');
  });

  // receives pos json file containing x and y position
  socket.on(Constant.MSG_TYPES.INPUT, (pos = { x, y }) => {
    Game.updatePosition(socket.id, pos);
  });

  socket.on('disconnect', () => {
    console.log('user has disconnected');
    Game.removePlayer(socket.id);
  });
}

module.exports = socketHandler;
