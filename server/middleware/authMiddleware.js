const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: "التوكن غير صالح، الدخول مرفوض" });
    }
  }

  if (!token) {
    res.status(401).json({ msg: "لا يوجد توكن، الدخول مرفوض" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ msg: "الدخول للمديرين فقط" }); // 403 = Forbidden
  }
};

module.exports = { protect, admin };
