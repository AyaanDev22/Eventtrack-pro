const jwt = require("jsonwebtoken");

 adminAuth = (req, res, next) => {
  if (!req.cookies.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};



