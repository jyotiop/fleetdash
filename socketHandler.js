// socketHandler.js
const { Server } = require('socket.io');

// 1. This is the helper function from your screenshot!
// It converts decimal latitude & longitude into compact raw binary bytes.
function packCoordinates(lat, lng) {
  const buffer = new ArrayBuffer(16); // Reserve 16 bytes of memory
  const view = new DataView(buffer);
  view.setFloat64(0, lat); // Write latitude in the first 8 bytes
  view.setFloat64(8, lng); // Write longitude in the next 8 bytes
  return buffer;
}


// 2. This function attaches Socket.io to your Express server
function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: '*' } // Allows the frontend team to connect to you
  });

  io.on('connection', (socket) => {
    console.log(`⚡ [Socket.io] Frontend client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`🔥 [Socket.io] Frontend client disconnected: ${socket.id}`);
    });
  });

  return io;
}


module.exports = { setupSocket, packCoordinates };
