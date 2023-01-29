const asyncHandler = require('express-async-handler');
const stripe = require('stripe')("sk_test_51MU6GsSFlUOCoafXf71mGKjBl3hupZHibzNm8zlEA6NsqeGvGsbZJ8Yvr18QjwAhe5c0Gr1j6OwUpbIzaLW3H7JU001zch5FfA");
const { v4: uuidv4 } = require('uuid');
const Address = require('../modals/addressModal');
const Order = require('../modals/orderModal');


// console.log("hello", stripe)
// @desc address
// @dsec /api/cart
// @access Public
const createOrder = asyncHandler(
    async (req, res) => {
        const { tokenPayment, getCartTotal, cart } = req.body;
        try {
            if (!tokenPayment || !getCartTotal || !cart) {
                return res.status(400).json({ message: "Please include all filed" })
            } else {
                // const address = new Address({
                //     user: req.user._id, address_line1, address_line2, state, pin_code
                // })
                const customer = await stripe.customers.create({
                    email: tokenPayment.email,
                    source: tokenPayment.id,

                })
                const method = await stripe.paymentMethods.create({
                    "type": "card",
                    "card": {
                        number: '4242424242424242',
                        exp_month: '12',
                        exp_year: '2023',
                        cvc: '314'
                    }
                })

                // console.log("new method ", method)
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: getCartTotal * 100,
                    currency: "inr",
                    customer: customer.id,
                    receipt_email: tokenPayment.email,
                    payment_method_types: ['card'],
                    payment_method: method.id,
                    confirm: true



                },

                    {
                        idempotencyKey: uuidv4()
                    })


                if (paymentIntent) {
                    const new_order = new Order({
                        name: req.user.name,
                        user: req.user.id,
                        email: req.user.email,
                        orderItem: cart,
                        order_amount: getCartTotal,
                        shipping_address: {
                            street: tokenPayment?.card?.address_line1,
                            city: tokenPayment?.card?.address_city
                            ,
                            postal_code: tokenPayment?.card?.address_zip,
                            country: tokenPayment?.card?.address_country


                        },
                        transaction_id: paymentIntent?.payment_method

                    })
                    new_order.save()

                    res.send('Order place successfully')
                }
                else {
                    res.send("payment failed")
                }

               
            }


        } catch (error) {
            console.log("error is ", error);
            return res.status(400).json({ message: "something went wrong" + error })
        }
    }
)

// @desc Address get
// @dsec /api/cart
// @access Public

const getOrder = asyncHandler(
    async (req, res) => {
        const orderlist = await Order.find({ user: req.user._id })

        return res.json(orderlist)
    }
)


module.exports = {
    createOrder,
    getOrder,

}