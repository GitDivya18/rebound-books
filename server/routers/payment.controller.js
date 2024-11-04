const { v4: uuidv4 } = require('uuid');
const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51IYnC0SIR2AbPxU0EiMx1fTwzbZXLbkaOcbc2cXx49528d9TGkQVjUINJfUDAnQMVaBFfBDP5xtcHCkZG1n1V3E800U7qXFmGf");
const Ordermodel = require('../models/Payment');
const User = require('../models/User');

router.post("/placeorder", async (req, res) => {
    const { token, cartItems, currentUser, subtotal } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const payment = await stripe.charges.create({
            amount: subtotal * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        });

        if (payment) {


            const order = new Ordermodel({
                userid: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                orderItems: cartItems,
                shippingAddress: {
                    address: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postalCode: token.card.address_zip
                },
                orderAmount: subtotal,
                transactionId: payment.source.id,
                isDelivered: false
            });

            await User.findByIdAndUpdate(currentUser._id, { $push: { ordersList: order._id } })

            await order.save();
            return res.status(201).json({ message: 'Order placed successfully' });
        } else {
            return res.status(400).json({ message: 'Payment failed' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
