// const paypal = require("paypal-rest-sdk");

// paypal.configure({
//   mode: "sandbox", // or 'live'
//   client_id: process.env.PAYPAL_CLIENT_ID,
//   client_secret: process.env.PAYPAL_CLIENT_SECRET,
// });

// exports.createPayment = (req, res) => {
//   const { amount } = req.body;
//   const create_payment_json = {
//     intent: "sale",
//     payer: {
//       payment_method: "paypal",
//     },
//     redirect_urls: {
//       return_url: "http://localhost:5000/success",
//       cancel_url: "http://localhost:5000/cancel",
//     },
//     transactions: [
//       {
//         amount: {
//           currency: "USD",
//           total: amount,
//         },
//         description: "Payment for blog publishing",
//       },
//     ],
//   };

//   paypal.payment.create(create_payment_json, (error, payment) => {
//     if (error) {
//       console.log(error);
//       res.status(500).json({ error: "Payment creation failed" });
//     } else {
//       res.status(200).json(payment);
//     }
//   });
// };
const paypal = require("paypal-rest-sdk");

// Configure PayPal with your credentials
paypal.configure({
  mode: "sandbox", // Use 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// Create Payment (Step 1: User initiates the payment)
exports.createPayment = (req, res) => {
  const { amount } = req.body; // Amount to charge for the blog post

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:5000/api/paypal/success", // After successful approval
      cancel_url: "http://localhost:5000/api/paypal/cancel", // If payment is canceled
    },
    transactions: [
      {
        amount: {
          currency: "USD",
          total: amount, // Dynamic amount from client-side
        },
        description: "Payment for blog publishing",
      },
    ],
  };

  // Create PayPal payment
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

// Execute Payment (Step 2: After the user approves the payment)
exports.executePayment = (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = { payer_id: req.query.PayerID };

  // Execute the payment
  paypal.payment.execute(paymentId, payerId, (error, payment) => {
    if (error) {
      console.error(error.response);
      return res.status(500).json({ error: "Payment execution failed" });
    } else {
      // Payment was successful, handle the logic to publish the blog
      res.status(200).json({ message: "Payment successful", payment });
    }
  });
};

// Cancel Payment (Optional: Handle if the payment is canceled)
exports.cancelPayment = (req, res) => {
  res.status(200).json({ message: "Payment canceled by the user" });
};
