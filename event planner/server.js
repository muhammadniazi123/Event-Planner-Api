import express from 'express';
import dotenv from "dotenv";
import connectdb from '../event planner/utils/DBconnect.js';
import eventRouter from "./router/eventRouter.js"
import authRouter from "./router/authRouter.js"
import errormiddleware from './middleware/error-middleware.js';


dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());

app.use("/api/auth",authRouter)
app.use("/api/Event",eventRouter)
app.use(errormiddleware)


connectdb().then(()=>{
app.listen((port), () => {
  console.log(`Server is running on http://localhost:${port}`);
});
})