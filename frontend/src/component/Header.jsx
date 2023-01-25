import React from "react";
import { useState,useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listCart } from "../action/cartActions";
import { logout } from "../action/userActions";
import LoginModal from "../modals/LoginModal";
import SignUpModal from "../modals/SignUpModal";

function Header() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [SignUpShow, setSignUpShow] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cartList = useSelector((state) => state.cartList);
  const {loading, cart, error} = cartList;
  useEffect(() => {
    dispatch(listCart());
    // if (!userInfo) {
    //     navigate('/')
    // }
  }, [dispatch, userInfo]);
  // console.log(cart);
  return (
    <>
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
      <SignUpModal show={SignUpShow} onHide={() => setSignUpShow(false)} />
      <Navbar
        bg="light"
        expand="lg"
        className="shadow-sm p-3 mb-5 bg-white rounded"
      >
        <Container>
          <Navbar.Brand onClick={() => navigate("/")} className="homepage">
            {" "}
            Pizza's Club
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav  ">
            <Nav className="me-auto">
              {userInfo ? (
                <Nav.Link onClick={() => navigate("/carts")}>Cart ({cart?.length})</Nav.Link>
              ) : (
                <Nav.Link onClick={() => setModalShow(true)}>Cart</Nav.Link>
              )}
              <NavDropdown
                title={userInfo ? `${userInfo?.name}` : `User`}
                id="basic-nav-dropdown"
              >
                {userInfo ? (
                  <NavDropdown.Item
                    onClick={() => {
                      // localStorage.removeItem("userInfo");
                      dispatch(logout());
                      navigate("/");
                    }}
                  >
                    Log Out
                  </NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item onClick={() => setModalShow(true)}>
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => setSignUpShow(true)}>
                      Sign Up
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
