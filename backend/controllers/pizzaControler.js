const asyncHandler = require("express-async-handler");
const Pizzas = require("../modals/pizzaModal");

// @desc notes
// @dsec /api/getpizza
// @access Public
const getPizzas = asyncHandler(

  // async (req, res) => {
  //     return await Pizza.find({}, (err, docs) => {
  //         if (err) {
  //             return res.json({ message: err })
  //         } else {
  //             return res.send(docs)
  //         }
  //     })

  // }
  async (req, res) => {
    let data = await Pizzas.find()
    return res.status(200).json({
      data: data
    })
  }
)

const postPizza = asyncHandler(
  async (req, res) => {
    let newPizza = await Pizzas.create(
      //   [
      //   {
      //     "name": "Margherita",
      //     "Varient": ["small", "medium", "large"],
      //     "prices": [
      //       {
      //         "small": 250,
      //         "medium": 400,
      //         "large": 500
      //       }
      //     ],
      //     "category": "Veg",
      //     " image_url": "https://www.dominos.co.in//files/items/Margherit.jpg",
      //     " description": "Cheesy Classic"
      //   },
      //   {
      //     "name": "Farmhouse",
      //     "Varient": ["small", "medium", "large"],
      //     "prices": [
      //       {
      //         "small": 250,
      //         "medium": 400,
      //         "large": 500
      //       }
      //     ],
      //     "category": "Veg",
      //     " image_url": "https://www.dominos.co.in//files/items/Farmhouse.jpg",
      //     " description": "Onion, Capsicum, Tomato & Grilled Mushroom"
      //   },
      //   {
      //     "name": "Peppy Paneer",
      //     "Varient": ["small", "medium", "large"],
      //     "prices": [
      //       {
      //         "small": 250,
      //         "medium": 400,
      //         "large": 500
      //       }
      //     ],
      //     "category": "Veg",
      //     " image_url": "https://www.dominos.co.in//files/items/Peppy_Paneer.jpg",
      //     " description": "Paneer, Capsicum & Red Paprika"
      //   },
      //   {
      //     "name": "Chicken Sausage ",
      //     "Varient": ["small", "medium", "large"],
      //     "prices": [
      //       {
      //         "small": 350,
      //         "medium": 420,
      //         "large": 500
      //       }
      //     ],
      //     "category": "nonveg",
      //     " image_url": "https://www.kolkatagiftsonline.com/pic/GG06239.jpg",
      //     " description": "Chicken Sausage & Cheese"
      //   },
      //   {
      //     "name": "Pepper Barbecue & Onion",
      //     "Varient": ["small", "medium", "large"],
      //     "prices": [
      //       {
      //         "small": 350,
      //         "medium": 420,
      //         "large": 500
      //       }
      //     ],
      //     "category": "nonveg",
      //     " image_url": "https://www.dominos.co.in//files/items/Pepper_Barbeque_&_Onion.jpg",
      //     " description": "Pepper Barbecue Chicken & Onion"
      //   },
      //   {
      //     "name": "PEPPER BARBECUE CHICKEN",
      //     "Varient": ["small", "medium", "large"],
      //     "prices": [
      //       {
      //         "small": 200,
      //         "medium": 350,
      //         "large": 400
      //       }
      //     ],
      //     "category": "nonveg",
      //     " image_url": "https://feenix.co.in/wp-content/uploads/2022/07/PepperBarbequeChickenC.jpg",
      //     " description": "Pepper Barbecue Chicken I cheese"
      //   }
      // ]
    )
    return res.status(201).json({
      data: newPizza
    })
  }
)

module.exports = {
  getPizzas,
  postPizza,
}