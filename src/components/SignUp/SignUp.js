import React, { useState } from "react";
import styles from "../../styles/Signup.module.css";
import { authSelector, registerUser } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // calling useNavigate function
  // destructure error, loading using
  // useSelector and passing authSelector inside useSelector
  const { loading, error } = useSelector(authSelector);
  const dispatch = useDispatch(); // calling useDispatch function
  // call handleSubmit function when signing up the user
  const handleSubmit = (e) => {
    e.preventDefault();
    // apply validation to name, email and password
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      // calling toast when user valid details are not entered
      toast.error("Please enter valid details");
    } else {
      // calling dispatch function and dispatching registerUser action in it and
      // passing name, email,password to it
      dispatch(registerUser({ name, email, password }))
        .unwrap()
        .then((user) => {
          // if user exists then navigate to home page else show error
          navigate("/");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  return (
    <form className={styles.outerContainer} onSubmit={handleSubmit}>
      <div className={styles.title}>
        <h3>Sign Up</h3>
      </div>
      <div className={styles.name}>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          value={name}
        />
      </div>
      <div className={styles.email}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          value={email}
        />
      </div>
      <div className={styles.password}>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          value={password}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button>{loading ? "Registering " : "Sign Up"}</button>
        {error && <div>{error}</div>}
      </div>
    </form>
  );
};

export default SignUp;
