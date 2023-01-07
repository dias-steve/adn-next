import Stripe from "stripe";

export default async function handler(req, res) {
  try{
  const {  amount, shipping  } = req.body;
    const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);
    //add check amount to wp
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount: parseInt(amount).toFixed(0),
      currency: "eur",
    });
    res.status(200).json(paymentIntent.client_secret);

  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        statusCode: 500,
        message: err.message
      });
  }
  }