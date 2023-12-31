// ! setup express-async-errors 
// ! make sure to import express async errors at the top of server module
import "express-async-errors"
// ! setup dotenv
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
// ! --- Test
// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// // import { Strategy as OAuth2Strategy } from 'passport-oauth2-client-password';
// // import findOrCreate from 'mongoose-findorcreate';
// import GoogleStrategy from 'passport-google-oauth20';
// !
// local imports
import { router as jobsRouter } from "./routes/jobsRouter.js";
import { router as authRouter } from "./routes/authRouter.js";
import { router as clientRouter } from "./routes/clientRouter.js";
import attendanceRouter from "./routes/attendanceRouter.js";
import userRouter from "./routes/userRouter.js"; 

import User from "./models/UserModel.js";

import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
// import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";
import {StatusCodes} from "http-status-codes"
// public
import {dirname} from "path";
import { fileURLToPath } from "url";
import path from "path";

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(import.meta.url);

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./ggms/dist")));
app.use(cookieParser())
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
)
app.use(mongoSanitize());

app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/clients", authenticateUser, clientRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/attendance", authenticateUser, attendanceRouter);

// ! --- Test
// app.use(
//   session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOrCreate({ googleId: profile.id }, (err, user) => {
//         return done(err, user);
//       });
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// app.get(
//   '/auth/google',
//   passport.authenticate('google', { scope: ['profile'] })
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, redirect or respond as needed
//     res.redirect('/');
//   }
// );

// ! ---

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./ggms/dist", "index.html"))
})

// not found middleware
app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({msg: "404 not found"});
});
// error route middleware
app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URL)
  const port = process.env.PORT || 5200;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}.`); 
  });
} catch (error) {
    console.log(error);
    // if there is an error, we just invoke the process.exit by node and pass in "1" which means that there is an error
    process.exit(1)
}


