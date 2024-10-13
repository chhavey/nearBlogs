const paypal = require("paypal-rest-sdk");

// Configure PayPal with your credentials
paypal.configure({
  mode: "sandbox", // will use 'live' for production but that's paid
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

exports.createPayment = (req, res) => {
  const { amount } = req.body; // Amount to charge for the blog post

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      // LOCALHOST LINKS:
      // return_url: "http://localhost:4000/api/paypal/success", // After successful approval
      // cancel_url: "http://localhost:4000/api/paypal/cancel", // If payment is canceled
      return_url: "https://nearblogs.onrender.com/api/paypal/success", //LIVE LINK
      cancel_url: "https://nearblogs.onrender.com/api/paypal/cancel", //LIVE LINK
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: amount,
        },
        description: "Payment for blog publishing",
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error creating PayPal payment" });
    }

    // Find the approval URL and send it to the client
    const approvalUrl = payment.links.find(
      (link) => link.rel === "approval_url"
    );
    res.status(200).json({ approvalUrl: approvalUrl.href });
  });
};

// Execute Payment, After the user approves the payment
exports.executePayment = (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = { payer_id: req.query.PayerID };

  paypal.payment.execute(paymentId, payerId, (error, payment) => {
    if (error) {
      console.error(error.response);
      return res.status(500).json({ error: "Payment execution failed" });
    } else {
      res.status(200).json({ message: "Payment successful", payment });
    }
  });
};

exports.cancelPayment = (req, res) => {
  res.status(200).json({ message: "Payment canceled by the user" });
};
