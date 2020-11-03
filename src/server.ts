import app from "./config/app";
import env from './environment';

import * as cors from 'cors';
import * as express from "express";

//get router
var router = express.Router();

//options for cors midddleware
// const options: cors.CorsOptions = {
//   allowedHeaders: [
//     'Origin',
//     'X-Requested-With',
//     'Content-Type',
//     'Accept',
//     'X-Access-Token',
//   ],
//   // credentials: true,
//   // methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
//   // origin: API_URL,
//   // preflightContinue: false,
// };

//use cors middleware
router.use(cors());

//add your routes

//enable pre-flight
router.options('*', cors());

const PORT = env.getPort();

app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
});
