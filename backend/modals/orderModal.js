const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    name: { type: String, require },
    email: { type: String, require },
    orderItem: { type: Array },
    shipping_address: { type: Object },
    order_amount: { type: String, require },
    isDelivered: { type: Boolean, require, default: false },
    transaction_id: { type: String, require },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)
