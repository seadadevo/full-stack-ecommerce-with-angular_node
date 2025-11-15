const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


const generateToken = (id) => {
  
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });
};


exports.registerUser = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User is already exists' });
    }

    
    user = new User({
      name,
      email,
      password,
    });

   
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

   
    await user.save();

    
    const token = generateToken(user.id);

    res.status(201).json({ token , msg: 'Created Email successfully' }); // 201 = Created
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};


exports.loginUser = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      
      return res.status(400).json({ msg: 'data is not correct' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'data is not correct' });
    }

    
    const token = generateToken(user.id);

    res.json({ token, msg: 'User signed in successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};