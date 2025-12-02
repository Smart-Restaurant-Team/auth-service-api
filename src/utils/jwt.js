import jwt from 'jsonwebtoken';
async function generateToken(user) {
    const now = Date.now();
    const expiresAt = new Date(now + 7 * 24 * 60 * 60 * 1000);
    const payload = { userId: user._id, email: user.email, role: user.role };
    const [token, refreshToken] = await Promise.all([
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5h" }),
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" }),])
    
    // return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // 
    console.log("generated tokn", token)
    return {
        accessToken: token,
        refreshToken,
        expiresAt,
    }
  ;
}

async function verifyToken(token) {
  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);

    return verifiedToken;
  } catch (error) {
    console.log("Token verification failed:", error);
  }
}

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3m" });
}

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  }
  catch (err) {
    console.error(err)
    return null;
  };
}
export { generateToken, verifyToken, generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken };