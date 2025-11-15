const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  registerUser,
  loginUser,
} = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    تسجيل مستخدم جديد
// @access  Public (أي حد يقدر يوصله)
router.post(
  '/register',
  [
    check('name', 'الاسم مطلوب').not().isEmpty(),
    check('email', 'من فضلك أدخل إيميل صحيح').isEmail(),
    check(
      'password',
      'الباسورد لازم يكون 6 حروف أو أرقام على الأقل'
    ).isLength({ min: 6 }),
  ],
  registerUser
);

// @route   POST api/auth/login
// @desc    تسجيل دخول المستخدم (هيرجع توكن)
// @access  Public
router.post(
  '/login',
  [
    check('email', 'من فضلك أدخل إيميل صحيح').isEmail(),
    check('password', 'الباسورد مطلوب').exists(),
  ],
  loginUser
);

module.exports = router;