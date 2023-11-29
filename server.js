// ! setup express-async-errors 
// ! make sure to import express async errors at the top of server module
import "express-async-errors"
// ! setup dotenv
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
// local imports
import { router as jobsRouter } from "./routes/jobsRouter.js";
import { router as authRouter } from "./routes/authRouter.js";
import { router as clientRouter } from "./routes/clientRouter.js";
import attendanceRouter from "./routes/attendanceRouter.js";
import userRouter from "./routes/userRouter.js"; 

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

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser())
app.use(express.json());
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/clients", authenticateUser, clientRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/attendance", attendanceRouter)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"))
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


