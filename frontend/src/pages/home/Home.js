import React from 'react'
import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPizzas } from '../../action/pizzaActions'
import PizzaCard from '../../component/PizzaCard'
import Loader from '../../component/Loader'
import { useNavigate } from 'react-router-dom'





function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [pizzaData, setPizzaData] = useState([])
  const { pizzaDatas, loading } = useSelector((state) => state.getPizza)
  useEffect(() => {
    dispatch(getAllPizzas())
  }, [dispatch])
  useEffect(() => {
    if (pizzaDatas) {
      setPizzaData(pizzaDatas?.data)
    }
  }, [pizzaDatas])

  const addToCart = () => {
    navigate('/carts')


  }
  return (
    // for search bar
    // for cards

    <div className='MainCard'>
      <div className="container">
        {loading && <Loader />}
        <div className='row'>

          {pizzaData?.map((pizzaItem, index) => {
            return <div className="col-md-4 "> <PizzaCard index={index} pizzaItem={pizzaItem} addToCart={addToCart} />
            </div>
          })}

        </div>
      </div>

    </div>
  )
}

export default Home