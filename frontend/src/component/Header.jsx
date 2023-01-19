import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import LoginModal from "../modals/LoginModal";
import SignUpModal from "../modals/SignUpModal";

function Header() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [SignUpShow, setSignUpShow] = useState(false);
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
              <Nav.Link>Cart</Nav.Link>
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setModalShow(true)}>
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setSignUpShow(true)}>
                  Sign Up
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
