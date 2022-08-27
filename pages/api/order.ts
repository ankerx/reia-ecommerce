import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";
import { commerce } from "../../lib/commerce";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        submit_type: "pay",
        payment_method_types: ["card", "blik", "p24"],
        // billing_address_collection: "auto",
        // shipping_address_collection: {
        //   allowed_countries: ["US", "CA"],
        // },
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1LaKVbFKkMwf4ICstqRsXmLL",
            quantity: 1,
          },
        ],
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      };
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params,
      );

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
