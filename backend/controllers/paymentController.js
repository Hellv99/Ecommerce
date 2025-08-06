import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createPaymentIntent = async (req, res) => {
  const { amount, orderId } = req.body;

  if (!amount || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount is required and must be positive" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      metadata: { order_id: orderId || "N/A", user_id: req.user.id },
    });
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      message: "Payment intent created successfully",
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res
      .status(500)
      .json({ message: "Server error while creating payment intent" });
  }
};
