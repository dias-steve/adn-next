import Stripe from "stripe";

export default async function handler(req, res) {
  try{
  const { amount } = req.body;
    const stripe = new Stripe("sk_test_51KQtG6Cxg5PGQKRKWESUbHSAFjDqgZ2lvKvs3okfwlJzMirJOhlGFu5avycevH8jL5LWwlINGEm0ufYSHPzjyfAZ00MlKSouPI");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
    });
    res.status(200).json(paymentIntent.client_secret);

  } catch (err) {
    res
      .status(500)
      .json({
        statusCode: 500,
        message: err.message
      });
  }
  }