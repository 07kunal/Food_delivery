const mongoose = require("mongoose")

const pizzaSchema =  new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please enter name"]
    },
    varient: [],
    prices: [],
    category: {
        type: String,
        // require
    },
    image: {
        type: String,
        // require
    },
    description: {
        type: String,
        // require
    }

}, {
    timestamps: true
})


module.exports = mongoose.model("Pizzas", pizzaSchema);