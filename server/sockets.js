const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./message.model');
const UserService = require('./user.service');

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',  // Allow all origins, adjust for production
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle messages sent by clients
    socket.on('chat message', (msg) => {
        console.log('Received message:', msg);
        const message = new Message({
          username: msg.username,
          message: msg.message,
        });
        Message.create({
            username: msg.username,
            message: msg.message,
          }, (err, savedMessage) => {
            if (err) {
              console.error(err);
            } else {
              console.log('Message saved to database:', savedMessage);
              console.log('Message ID:', savedMessage._id);
              io.emit('chat message', msg);  // Broadcast message to all clients
            }
        });
      });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};