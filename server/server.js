import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import hallRouter from "./routes/hallRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import bookingRouter from "./routes/bookingRoutes.js";
import campaignRouter from "./routes/campaignRoutes.js"
import priestServiceRouter from "./routes/priestServiceRoute.js";
import paymentRouter from "./routes/paymentRoutes.js"
import donationsRouter from "./routes/donationRoute.js"
import ladiesEventRouter from "./routes/ladiesEventRoutes.js"
import newsRouter from "./routes/newsRoute.js"



const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
dotenv.config();
const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/halls", hallRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/campaigns", campaignRouter);
app.use("/api/priest", priestServiceRouter);
app.use("/api/payments", paymentRouter);
app.use('/api/donations',donationsRouter);
app.use('/api/events/ladies',ladiesEventRouter);
app.use('/api/news',newsRouter);

app.use("/uploads", express.static("uploads"));



app.listen(port, () => console.log(`Server started on PORT:${port}`));
