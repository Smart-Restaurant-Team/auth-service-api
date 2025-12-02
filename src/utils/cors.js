const whitelist = new Set([
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5173"
]);


const CORS_CONFIG = {
    origin: (origin, callback) => {
      if (!origin || whitelist.has(origin)) {
        callback(null, true);
      } else {
        const error = new Error("Not allowed by CORS");
        error.status = 450;
        callback(error);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      // "X-Requested-With",
      // "X-CSRF-Token",
      // "Accept-Language",
    ],
    // exposedHeaders: ["Content-Length", "X-Powered-By"],
    // maxAge: 600,
    credentials: true,
  }

export {CORS_CONFIG}