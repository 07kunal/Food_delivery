const express = require("express")
const colors = require("colors")
const connectDb = require("./config/db")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 5000

// connect to database
connectDb()

const app = express()

app.get('/', (req, res) => {
    return res.status(200).json({ message: "Welcome to Pizza_Delivery_app API" })
})
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 