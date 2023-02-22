const asyncHandler = require('express-async-handler')
const Cart = require('../modals/cartModal')
const User = require('../modals/userModal')

// @desc carts
// @dsec /api/cart
// @access Public
const createCarts = asyncHandler(
    async (req, res) => {
        const { pizza_name, quantity, variant, image_url, prices, price,product_id } = req.body;
        if (!pizza_name || !quantity || !variant || !image_url || !price || !product_id) {
            return res.status(400).json({ message: "Please include all filed" })
        } else {
            const cart = new Cart({
                user: req.user._id, pizza_name, quantity, variant, image_url, prices, price,product_id
            })
            const createCart = await cart.save()

            return res.status(201).json(createCart)
            // return console.log("first")

        }
    }
)

// @desc cart get
// @dsec /api/cart
// @access Public

const getCarts = asyncHandler(
    async (req, res) => {
        const carts = await Cart.find({ user: req.user._id })

        return res.json(carts)
    }
)
// @desc cart get by id
// @dsec /api/cart
// @access Public
const cartById = asyncHandler(async (req, res) => {

    const singleCart = await Cart.findById(req.params.id)
    // console.log(singleNote);
    if (singleCart) {
        return res.json(singleCart)

    } else {
        return res.status(404).json({ message: "Pizza Not Found" })
    }

})
// @desc update cart put
// @dsec /api/cart
// @access Public

const UpdatedCart = asyncHandler(async (req, res) => {
    const { quantity, varient, price } = req.body;

    // const cart = await Cart.findById(pizza_id);
    const cart = await Cart.findById(req.params.id);



    if (cart.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "You can't perform this action" });

    }

    if (cart) {
        cart.quantity = quantity;
        cart.varient = varient;
        cart.price = price;

        const updatedCart = await cart.save();
        res.json(updatedCart);
    } else {
        res.status(404);
        throw new Error("Cart not found");
    }
});
// @desc Delete cart put
// @dsec /api/cart
// @access Public
const DeleteCart = asyncHandler(async (req, res) => {
    // find the Carts array



    // const singleCart = await Cart.findById(pizza_id)
    const singleCart = await Cart.findById(req.params.id)

    if (singleCart.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: "You can't perform this action" });

    }
    if (singleCart) {
        await singleCart.remove();
        return res.json({ message: "Cart Removed" })

    } else {
        return res.status(404).json({ message: "Cart Not Found" })
    }

})
module.exports = {
    createCarts,
    getCarts,
    UpdatedCart,
    DeleteCart,
    cartById
}