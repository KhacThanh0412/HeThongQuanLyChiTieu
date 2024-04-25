const paymentService = require("../services/Payments.Service");

exports.createPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const newPayment = await paymentService.createPayment(paymentData);
    res
      .status(201)
      .json({ message: "Payment created successfully", payment: newPayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
