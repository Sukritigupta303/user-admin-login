const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ⬇️ REGISTER FUNCTION
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ⬇️ LOGIN FUNCTION
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ⬇️ ADMIN VIEW USERS FUNCTION
const getUsers = async (req, res) => {
  try {
    // Sirf admin ko users list dikhani chahiye
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find().select("-password"); // Password hide
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Export kare
module.exports = { register, login, getUsers };
