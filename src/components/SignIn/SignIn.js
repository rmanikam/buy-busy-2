import React, { useEffect, useState } from "react";
import styles from "../../styles/SignIn.module.css";
import { Link } from "react-router-dom";
import { authSelector, loginUser } from "../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // calling useDispatch function
  const navigate = useNavigate(); // calling useNavigate function

  // destructure error, loading using
  // useSelector and passing authSelector inside useSelector
  const { error, loading } = useSelector(authSelector);
  // call handleSubmit function when signing in
  const handleSubmit = (e) => {
    e.preventDefault();
    // apply validation to email and password
    if (email.trim() === "" || password.trim() === "") {
      // calling toast when user valid details are not entered
      toast.error("Please enter valid details");
    } else {
      // calling dispatch function and dispatching loginUser action in it and
      // passing email ,password to it
      dispatch(loginUser({ email, password }))
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
    <div className={styles.outerContainer}>
      <form className={styles.innerContainer} onSubmit={handleSubmit}>
        <div className={styles.title}>
          <h3>Sign In</h3>
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
        <div className={styles.buttonContainer} disabled={loading}>
          <button> {loading ? "Logging in" : "Sign In"}</button>
        </div>
        {error && <div>{error}</div>}
        <Link to="/signup">
          <h4>Or Sign Up Instead</h4>
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
