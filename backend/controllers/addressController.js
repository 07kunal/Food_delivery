const asyncHandler = require('express-async-handler');
const Address = require('../modals/addressModal');


// @desc address
// @dsec /api/cart
// @access Public
const createAddress = asyncHandler(
    async (req, res) => {
        const { address_line1, address_line2, state, pin_code } = req.body;
        if (!address_line1 || !state || !pin_code) {
            return res.status(400).json({ message: "Please include all filed" })
        } else {
            const address = new Address({
                user: req.user._id, address_line1, address_line2, state, pin_code
            })
            const createAddress = await address.save()

            return res.status(201).json(createAddress)
            // return console.log("first")

        }
    }
)

// @desc Address get
// @dsec /api/cart
// @access Public

const getAddress = asyncHandler(
    async (req, res) => {
        const address = await Address.find({ user: req.user._id })

        return res.json(address)
    }
)


module.exports = {
    createAddress,
    getAddress,

}