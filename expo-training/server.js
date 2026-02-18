// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }, () =>
  console.log('WebSocket server running on ws://localhost:8080')
);

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Echo messages back to client
  ws.on('message', (message) => {
    console.log('Received from client:', message);
    ws.send(`Server echo: ${message}`);
  });

  ws.on('close', () => console.log('Client disconnected'));
});
