import express from 'express';
import { testRouter } from './routes/test.route.js';
import { BASE_ROUTE } from './constants.js';
import { userRouter } from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import { profileRoute } from './routes/profile.route.js';
import { membersRoute } from './routes/members.route.js';
import { eventRouter } from './routes/events.route.js';

const app = express();

app.use(
    cors({
      origin: ["http://localhost:3000","https://techonicks.vercel.app"],
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
app.use(`${BASE_ROUTE}/user/profile`,profileRoute)
app.use(`${BASE_ROUTE}/user/members`,membersRoute)
app.use(`${BASE_ROUTE}/event`,eventRouter) 

export { app }
