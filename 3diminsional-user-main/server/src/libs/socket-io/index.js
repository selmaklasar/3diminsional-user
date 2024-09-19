const { Server } = require('socket.io');
const logger = require('../logger');

let io;

module.exports = {
  setupSocketIo(server) {
    io = new Server(server);
    io.on('connection', (socket) => {
      logger.info(`Connected to socket ${socket.id}`);
      socket.on('disconnect', () => {
        logger.info(`Socket ${socket.id} disconnected`);
      });
    });
    return io;
  },

  getIo() {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
  },
};

