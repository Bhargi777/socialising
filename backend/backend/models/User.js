const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  otp: { type: String },
  otpExpiry: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
