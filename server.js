import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import adminRoute from "./routes/admin.routes.js";
import authRoute from './routes/auth.route.js'
import { connectDb } from './config/db.connect.js';
import drawRoute from "./routes/draw.route.js";
import scoreRoute from './routes/scores.route.js';
import subscriptionRoute from "./routes/subscription.route.js";
import charityRoute from './routes/charity.route.js'
import dashboardroute from './routes/dashboard.route.js'




dotenv.config();


const app = express();


connectDb();


app.use(cors({
    origin: "*"
}));

app.use(express.json());


app.get("/", (req, res) => {
    res.json("hello vikram");
});
app.use("/admin", adminRoute);
app.use("/dashboard", dashboardroute)
app.use('/auth', authRoute)
app.use('/score', scoreRoute)
app.use('/charity', charityRoute)
app.use("/draw", drawRoute);
app.use('/subscription', subscriptionRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});