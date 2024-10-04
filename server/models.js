const mongoose = require('mongoose');
const User = require('./user.model');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  roles: [String],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
});

const User = mongoose.model('User', userSchema);

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
});

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
});

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Group: mongoose.model('Group', groupSchema),
  Channel: mongoose.model('Channel', channelSchema),
  Message: mongoose.model('Message', messageSchema),
  registerUser: (user) => {
    const newUser = new User(user);
    newUser.save((err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('User registered:', user.username);
      }
    });
  }
};
