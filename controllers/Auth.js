const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


   
exports.loginUser = async (req, res) => {
  try {
     const { email, password } = req.body;

  if (email === "admin@eventtrack.pro" && password === "admin123") {
    res.cookie("admin", email, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true only on HTTPS
    });

    return res.json({ success: true });
  }

    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
res.clearCookie("admin");
  res.json({ success: true })
};
