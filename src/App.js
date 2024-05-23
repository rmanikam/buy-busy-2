import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ProductCard from "../src/components/ProductCard/ProductCard";
import Cart from "../src/components/Cart/Cart";
import Order from "../src/components/Order/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { authSelector } from "../src/redux/reducers/authReducer";
function App() {
  const navigate = useNavigate();
  let { user } = useSelector(authSelector);
  let [userValue, setUserValue] = useState("");
  const auth = getAuth();
  user = userValue;
  useEffect(() => {
    onAuthStateChanged(auth, (userOne) => {
      if (userOne) {
        const uid = user.uid;
      } else {
        // User is signed out
        setUserValue("");
        navigate("/signin");
      }
    });
  }, [user]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/productcard" element={<ProductCard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
