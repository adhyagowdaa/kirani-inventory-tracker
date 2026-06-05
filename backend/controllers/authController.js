const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Create the new user
        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Registration failed." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("DEBUG: Attempting login for:", email);
        const user = await User.findOne({ email });
        console.log("DEBUG: User found in DB:", user ? "Yes" : "No");

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful!", userId: user._id });
    } catch (error) {
        res.status(500).json({ error: "Login failed." });
    }
};