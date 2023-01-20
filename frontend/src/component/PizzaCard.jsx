import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import LoginModal from "../modals/LoginModal";
function PizzaCard(props) {
  const { index, pizzaItem, addToCart } = props;
  const [varient, setVarient] = useState("small");
  const [quantity, setQuantity] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // console.log(varient);
  // console.log(quantity);
  // console.log(pizzaItem?.prices[0][varient]);
  return (
    <>
      <LoginModal
        show={modalLoginShow}
        onHide={() => setModalLoginShow(false)}
      />

      <div key={index} className="cardDiv shadow-lg p-3 mb-5 bg-white rounded">
        <div className="cardHeading">
          <h1>{pizzaItem.name}</h1>
          <div className="img">
            <img
              src={pizzaItem.image_url}
              alt=""
              onClick={() => setModalShow(true)}
            />
          </div>
        </div>
        <div className="cardVarient">
          <div className="varient">
            <span>Varients:</span>
            <select
              name="varient"
              id="varient"
              className="selectedOption form-control"
              value={varient}
              onChange={(e) => setVarient(e.target.value)}
            >
              {pizzaItem.Varient?.map((price, index) => {
                return (
                  <option key={index} value={price}>
                    {price}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="quantity">
            <span>Quantity:</span>
            <select
              name="quantity"
              id="quantity"
              className="selectedOption form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {[...Array(10).keys()].map((x, i) => {
                return (
                  <option value={i + 1} key={x}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="cardPrice">
          <div className="price">
            Price:₹ {pizzaItem?.prices[0][varient] * quantity}/-
          </div>
          <div className="cart">
            {userInfo ? (
              <button className="btnCart" onClick={addToCart}>
                Add to Cart
              </button>
            ) : (
              <button
                className="btnCart"
                onClick={() => setModalLoginShow(true)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
        {/* modal */}
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {pizzaItem.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="imgModal">
            <img
              src={pizzaItem.image_url}
              alt=""
              onClick={() => setModalShow(true)}
            />
          </div>
          <h4>Description</h4>
          <p>{pizzaItem.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            // onClick={() => setModalShow(false)}

            variant="danger"
          >
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PizzaCard;
