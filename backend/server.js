const express = require("express")
const colors = require("colors")
const connectDb = require("./config/db")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 5000
const pizzaRoutes = require('./routes/pizzaRoutes')
const Pizza = require("./modals/pizzaModal")


// connect to database
connectDb()

const app = express()
app.use(express.json());

// Routes for get Pizzas
app.use('/api/pizzas', pizzaRoutes)
// app.get('/api/pizzas', (req, res) => {
//     Pizza.find({}, (err, docs) => {
//         if (err) {
//             console.log(err);
//         } else {
//             return res.send(docs)
//         }
//     })
// })

app.get('/', (req, res) => {
    return res.status(200).json({ message: "Welcome to Pizza_Delivery_app API" })
})
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 