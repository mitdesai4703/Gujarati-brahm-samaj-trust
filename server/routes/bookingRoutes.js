import express from 'express';
import {
  checkAvailabilityAPI,
  createBooking,
  getHallBookings,
  getUserBookings,
} from '../controllers/bookingController.js';
import userAuth from '../middleware/userAuth.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', userAuth, createBooking);
bookingRouter.get('/user', userAuth, getUserBookings);
bookingRouter.get('/hall', userAuth, getHallBookings);

export default bookingRouter;
