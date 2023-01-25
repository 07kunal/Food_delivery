const mongoose = require('mongoose')
const cartSchema = mongoose.Schema(
    {
        pizza_name: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        variant: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        prices: {
            type: Array,
            required: true,
           
        },
        price: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    }
    ,
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Cart', cartSchema)