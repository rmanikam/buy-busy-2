import React from "react";
import styles from "../../styles/Navbar.module.css";
import { Link, Outlet } from "react-router-dom";
import home_logo from "../../assets/icons8-home-48.png";
import sign_In_logo from "../../assets/4115234_login_sign in_icon.png";
import cart_logo from "../../assets/trolley.png";
import order_logo from "../../assets/order.png";
import logout_logo from "../../assets/logout.png";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";
import { signOut } from "firebase/auth"; // new addition
const Navbar = () => {
  const navigate = useNavigate();
  // destructure user using useSelector and pass authSelector inside useSelector
  let { user } = useSelector(authSelector);

  // calling handle logout func to logout the user and navigate to sign in page
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <>
      {/* if user exists then show the items below */}
      {user ? (
        <>
          <div className={styles.navContainer}>
            <div className={styles.projectTitleLogo}>
              <Link to="/">
                <h4>Busy Buy</h4>
              </Link>
            </div>
            <div className={styles.home}>
              <img
                src={home_logo}
                alt="Home logo"
                className={styles.homeLogo}
              />
              <Link to="/">
                <h4>Home</h4>
              </Link>
            </div>
            <div className={styles.orders}>
              <img
                src={order_logo}
                alt="Order logo"
                className={styles.orderLogo}
              />
              <Link to="/order">
                <h4>My orders</h4>
              </Link>
            </div>
            <div className={styles.cart}>
              <img
                src={cart_logo}
                alt="Cart logo"
                className={styles.cartLogo}
              />
              <Link to="/cart">
                <h4>Cart</h4>
              </Link>
            </div>
            <div className={styles.logout} onClick={handleLogout}>
              <img
                src={logout_logo}
                alt="Logout logo"
                className={styles.logoutLogo}
              />
              <Link to="/signin">
                <h4>Logout</h4>
              </Link>
            </div>
          </div>
          <Outlet />
        </>
      ) : (
        <>
          {/* if user is undefined then show the items below */}
          <div className={styles.navContainer}>
            <div className={styles.projectTitleLogo}>
              <Link to="/">
                <h4>Busy Buy</h4>
              </Link>
            </div>
            <div className={styles.home}>
              <img
                src={home_logo}
                alt="Home logo"
                className={styles.homeLogo}
              />
              <Link to="/">
                <h4>Home</h4>
              </Link>
            </div>
            <div className={styles.signIn}>
              <img
                src={sign_In_logo}
                alt="Sign In logo"
                className={styles.signInLogo}
              />
              <a href="/signIn">SignIn</a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
