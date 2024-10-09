// // messages.test.js
// const request = require('supertest');
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const { Message } = require('../models'); // Ensure your models are correctly imported
// const messagesRouter = require('./messages'); // Adjust the path as necessary

// const app = express();

// // Middleware for parsing application/json
// app.use(bodyParser.json());
// app.use(messagesRouter);

// // Connect to the test database
// before(async () => {
//     await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
// });

// // Clear the database before each test
// beforeEach(async () => {
//     await Message.deleteMany({});
// });

// // Disconnect from database after all tests
// after(async () => {
//     await mongoose.connection.close();
// });

// describe('Message Routes', () => {
//     describe('POST /api/messages', () => {
//         it('should save a new message and return it', async () => {
//             const messageData = {
//                 username: 'testuser',
//                 text: 'Hello, this is a test message!'
//             };

//             const response = await request(app)
//                 .post('/api/messages')
//                 .send(messageData);

//             // Assertions
//             expect(response.status).to.equal(200);
//             expect(response.body).to.have.property('_id');
//             expect(response.body.username).to.equal(messageData.username);
//             expect(response.body.text).to.equal(messageData.text);
//             expect(new Date(response.body.timestamp)).to.be.a('date');

//             // Verify the message is saved in the database
//             const savedMessage = await Message.findById(response.body._id);
//             expect(savedMessage).to.not.be.null;
//             expect(savedMessage.username).to.equal(messageData.username);
//             expect(savedMessage.text).to.equal(messageData.text);
//         });

//         it('should return 500 if there is an error saving the message', async () => {
//             // Simulate a situation where the message cannot be saved, for instance by using invalid data.
//             const response = await request(app)
//                 .post('/api/messages')
//                 .send({}); // Sending empty data to trigger validation error

//             expect(response.status).to.equal(500);
//             expect(response.body).to.have.property('error', 'Error saving message to database');
//         });
//     });
// });
