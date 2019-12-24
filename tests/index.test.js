const io = require('socket.io-client');
const syncServer = require('../server');
let socket;

function createRequestURL(server)
{
  const address = server.address();
  let requestUrl = `http://[${address.address}]:${address.port}`;
  return requestUrl.replace('[::]', 'localhost');
}

beforeEach((done) => {
  socket = io.connect(createRequestURL(syncServer.server), {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  });
  socket.on('connect', () => {
    done();
  });
});

afterEach((done) => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});

afterAll((done) => {
  syncServer.server.close(done); //Stop the server (and the server-side socket.io instance within it).
});


describe('basic socket.io example', () => {

  test('should communicate', (done) => {
    // once connected, emit Hello World
    socket.emit('message', 'Bell');
    socket.on('response-message', (message) => {
      // Check that the message matches
      expect(message).toBe('Face');
      done();
    });
  });
  
});