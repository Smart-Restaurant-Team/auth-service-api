import User from "../models/user.model";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

const AuthWithGoogle = async (req, res) => {
        // Successful authentication, generate tokens
        //
        const findUser = await User.findOne({ googleId: req.user.googleId }); 
        if (!findUser) {
            const newUser = await User.create({
              provider: 'google',
              googleId: req.user.googleId,
              name: req.user.name,
              email: req.user.email,
            })
            const user = { username: newUser.name, googleId: newUser.googleId, id: newUser._id };
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            // Send tokens as JSON response
            res.status(200).json({ accessToken, refreshToken, message: "Google login successful", user  });
        }
    }