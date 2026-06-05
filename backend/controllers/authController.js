const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ==========================================
// REGISTER / SIGNUP CONTROLLER
// ==========================================
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create and save the new user record
        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();
        
        return res.status(201).json({ 
            message: "User registered successfully!" 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Server error during registration", 
            error: error.message 
        });
    }
};

// ==========================================
// LOGIN CONTROLLER
// ==========================================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verify that the user exists
        const user = await User.findOne({ email });
        if (!user) {
            // Sending a 400 error forces Axios on frontend to drop into catch()
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 2. Compare incoming plain text password with hashed database password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 3. Success response
        return res.status(200).json({ 
            message: "Login successful!",
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Server error during login", 
            error: error.message 
        });
    }
};

// Exporting named objects to exactly match your authRoutes expectations
module.exports = {
    register,
    login
};