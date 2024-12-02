import express from 'express';
import { testRouter } from './routes/test.route.js';
import { BASE_ROUTE } from './constants.js';
import { userRouter } from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

// Redirections

// Routes

app.use("/",testRouter)
app.use(`${BASE_ROUTE}/user`,userRouter)

export { app }
