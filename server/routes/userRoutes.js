import express from 'express';

import {
  updateUserProfile,
  deleteUserAccount,
  getUserData
} from '../controllers/userController.js';

import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.put('/update-profile', userAuth, updateUserProfile);
userRouter.delete('/delete-account', userAuth, deleteUserAccount);

export default userRouter;
