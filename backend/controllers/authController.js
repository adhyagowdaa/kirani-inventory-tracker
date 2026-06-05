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
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // --- DEBUG LOGS START ---
        console.log("=== LOGIN ATTEMPT INCOMING ===");
        console.log("Email submitted:", email);
        
        const user = await User.findOne({ email });
        
        console.log("Database lookup user found:", user ? "Yes" : "No");
        if (user) {
            console.log("User object from DB:", JSON.stringify(user));
        }
        // --- DEBUG LOGS END ---

        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.log("❌ LOGIN FAILED: User not found or password incorrect.");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        console.log("✅ LOGIN SUCCESSFUL for:", email);
        res.status(200).json({ message: "Login successful!", userId: user._id });
    } catch (error) {
        console.error("💥 SYSTEM ERROR DURING LOGIN:", error);
        res.status(500).json({ error: "Login failed." });
    }
};