const mongoose = require('mongoose')
const addressSchema = mongoose.Schema(
    {
        address_line1: {
            type: String,
            required: true,
        },
        address_line2: {
            type: String,
        },
        state: {
            type: String,
            required: true,
        },
        pin_code: {
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

module.exports = mongoose.model('Address', addressSchema)