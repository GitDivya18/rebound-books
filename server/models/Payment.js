const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        require
    },
    email: {
        type: String,
        require
    },
    orderItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodPost'
    },
    shippingAddress: {
        address: { type: String, require },
        city: { type: String, require },
        postalCode: { type: Number, require },
        country: { type: String, require }
    },
    orderAmount: { type: Number, require },
    transactionId: { type: String, require },
    isDelivered: { type: Boolean, require }
}, {
    timestamps: true
})

const Ordermodel = mongoose.model('orders', orderSchema)

module.exports = Ordermodel