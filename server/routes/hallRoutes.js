import express from "express";
import { registerHall } from "../controllers/hallController.js";
import userAuth from "../middleware/userAuth.js";


const hallRouter = express.Router();


hallRouter.post("/register", userAuth, registerHall);
;

export default hallRouter;
