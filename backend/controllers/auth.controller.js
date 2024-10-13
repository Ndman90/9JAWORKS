import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

export const signup = async(req, res) => {
    try {
        const {name, username, email, password} = req.body;

        if(!name || !username || !email || !password){
            return res.status(400).json({ message: "All Fields Are Required" });
        }


        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email Already Exists"});
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username Already Exists"});
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            username,
            email,
            password: hashPassword
        })

        await user.save();

        const token = jwt.sign({ userId:user._id}, process.env.JWT_SECRET, {expiresIn: "3d"})

        res.cookie("jwt-9JAWORKS", token, {
			httpOnly: true, // prevent XSS attack
			maxAge: 3 * 24 * 60 * 60 * 1000,
			sameSite: "strict", // prevent CSRF attacks,
			secure: process.env.NODE_ENV === "production", // prevents man-in-the-middle attacks
		});

        res.status(200).json({ message: "User Registered Successfully" });

        const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username;

        try {
            await sendWelcomeEmail(user.email, user.name, profileUrl)
        } catch (emailError) {
            console.error("Error In Sending Welcome Email", emailError);
        }
    }
    catch (error) {
        console.log("Error in Signup: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
    
}; 

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "Invalid Username" });
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid Password" });
		}

		// Create and send token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
		await res.cookie("jwt-9JAWORKS", token, {
			httpOnly: true,
			maxAge: 3 * 24 * 60 * 60 * 1000,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});

		res.json({ message: "Logged in successfully" });
	} catch (error) {
		console.error("Error in login controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const logout = (req, res) => {
	res.clearCookie("jwt-9JAWORKS");
	res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		console.error("Error in getCurrentUser controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};