require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.post('/send-otp', async (req, res) => {
  const { rollNo } = req.body;
  const user = await User.findOne({ rollNumber: rollNo });
  if (!user) return res.status(400).send('User not found.');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  await user.save();

  // Replace with actual SMS API logic
  console.log(`OTP for ${user.phoneNumber}: ${otp}`);
  res.send('OTP sent successfully.');
});

app.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;
  const user = await User.findOne({ otp, otpExpiry: { $gte: Date.now() } });
  if (!user) return res.status(400).send('Invalid or expired OTP.');

  user.otp = null;
  user.otpExpiry = null;
  await user.save();
  res.send('Login successful.');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
