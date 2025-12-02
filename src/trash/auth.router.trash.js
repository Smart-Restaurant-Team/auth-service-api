import { Router } from "express";
import { AuthWithGoogle, authWithGoogleClient, login, sendOTP, verifyOtp } from "../controllers/auth.controller.js";
import passport from "../utils/passport.js";
import { CreateUser } from "../controllers/user.controller.js";
import axios from "axios";

const AuthRoutes = Router();



AuthRoutes.get('/google',(req,res)=>{
 passport.authenticate('google', { scope: ['profile', 'email'] })
});
AuthRoutes.get('/google/callback',
  passport.authenticate("google", { session: false, failureRedirect: "/api/auth/google/failure" }),
  AuthWithGoogle
)

AuthRoutes.get("/google/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "User cancelled Google login or denied permissions",
  });
});

AuthRoutes.post('/google/check', async (req,res)=>{

  try {
    const {token} = req.body;
    // console.log(req.body)
    if(token){
      const googleUser = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo",
    { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(verify(token))
      res.status(200).json({data: googleUser.data})
      // console.log()
    }
    
    // res.json({ success: true, token: jwt, user: payload });
  } catch (err) {
    console.log(err)
    res.status(401).json({ error: "error", message: err.message });
  }
})