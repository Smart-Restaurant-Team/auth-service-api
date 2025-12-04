import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoDB from './src/utils/mongodb.js';
import i18nMiddleware from "./src/utils/i18n.js";
// import errorHandler from './src/middlewares/errorHandler.js'
import { CORS_CONFIG } from './src/utils/cors.js';
import { HeaderMiddlware } from './src/middlewares/Header.middleware.js';

// dotenv.config({
//     // path: "./.env"
// })

const port = process.env.PORT || 8080;
const app = express();

// middleware
app.use(i18nMiddleware);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

// middleware - cors
app.use(cors(CORS_CONFIG));


// middleware - header 
app.use(HeaderMiddlware);

// routes
const BASE_API = '/api'



// db connection
mongoDB();
// server runnig
app.listen(port, ()=>{
  console.log('server is runing on : ', `http://localhost:${port}`  )
})