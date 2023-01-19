import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PizzaCard from '../../component/PizzaCard'
import { pizzaData } from '../../staticdata/pizzadata'


function Home() {
  return (
    // for search bar
    // for cards

    <div className='MainCard'>
      <div className="container">
        <div className='row'>

          {pizzaData?.map((pizzaItem, index) => {
            return <div className="col-md-4 "> <PizzaCard index={index} pizzaItem={pizzaItem} />
            </div>
          })}

        </div>
      </div>

    </div>
  )
}

export default Home