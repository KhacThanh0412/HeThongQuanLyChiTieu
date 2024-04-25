const Payment = require("../models/PaymentsModel");

exports.createPayment = async (paymentData) => {
  const newPayment = new Payment(paymentData);
  return await newPayment.save();
};
