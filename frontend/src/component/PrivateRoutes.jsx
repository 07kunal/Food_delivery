import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../customhooks/useAuthStatus";
import LoginModal from "../modals/LoginModal";
import Loader from "./Loader";

function PrivateRoutes() {
  const [modalShow, setModalShow] = useState(false);
  const { loggedIn, checkingStatus } = useAuthStatus();
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  }, [loggedIn]);

  if (checkingStatus) {
    return <Loader />;
  }

  // return loggedIn ? <Outlet /> : <Navigate to="/login" />;
  return loggedIn ? (
    <Outlet />
  ) : (
    <LoginModal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        navigate("/");
      }}
    />
  );
}

export default PrivateRoutes;
