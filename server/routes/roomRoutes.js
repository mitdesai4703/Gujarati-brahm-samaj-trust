import express from "express";
import upload from "../middleware/uploadMiddleware.js"; 

import userAuth from "../middleware/userAuth.js";
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/roomController.js";


const roomRouter = express.Router();

roomRouter.post('/', userAuth, upload.array("images", 4), createRoom);
roomRouter.get('/',getRooms);
roomRouter.get('/owner',userAuth,getOwnerRooms);
roomRouter.post('/toggle-availability',userAuth,toggleRoomAvailability);


export default roomRouter;