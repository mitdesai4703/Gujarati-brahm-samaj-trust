import Stripe from 'stripe'; 
import userAuth from "../middleware/userAuth.js";
import express from "express";

const router = express.Router();
const stripeInstance = Stripe(process.env.SECRET_KEY); 

router.post("/create-payment-intent", userAuth, async (req, res) => {
  try {
    console.log("SECRET_KEY:", process.env.SECRET_KEY); 
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: req.body.amount * 100, 
      currency: "inr",
      automatic_payment_methods: { enabled: true, },
      description: "GBST",
    });

    return res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error); 
    return res.status(500).json({ message: error.message, error: error });
  }
});

export default router;
