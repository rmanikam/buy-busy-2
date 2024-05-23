import React, { useEffect } from "react";
import styles from "../../styles/Cart.module.css";
import increase from "../../assets/plus.png";
import decrease from "../../assets/minus.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addingProductInCartAsync,
  cartSelector,
  removeCartProductAsync,
  removeFromCartAsync,
} from "../../redux/reducers/cartReducer";
import { totalValue } from "../../redux/reducers/cartReducer";
import { actions } from "../../redux/reducers/cartReducer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  // storing value of cart items inside cart array using
  // useSelector and passing cartSelector inside useSelector
  const cart = useSelector(cartSelector);
  // storing value of total combined price of all items inside total variable using
  // useSelector and passing totalValue inside useSelector
  const total = useSelector(totalValue);
  //calling navigate func using useNavigate()
  const navigate = useNavigate();

  // calling purchase function  in which the value of cart items
  // inside cart array is stored inside currentCart
  const purchase = () => {
    const currentCart = [...cart];
    //  dispatch an action of purchaseItems and pass currentCart in it
    dispatch(actions.purchaseItems(currentCart));
    // navigate to order page
    navigate("/order");
    // cart.push([]); // in redux we cannot update state directly. we have to dispatch an action for that
    // Reset the cart after purchase
    dispatch(actions.resetCart());
  };

  return (
    <>
      {/* if cart is empty  show toast.error("No Products In Cart!")*/}
      {cart.length === 0 && toast.error("No Products In Cart!")}
      {/* if cart.length > 0 then display all items of the cart inside cart component */}
      {cart.length > 0 ? (
        <div className={styles.cartContainer}>
          <div className={styles.purchaseContainer}>
            {/* show totalPrice */}
            <p>Total Price: ₹ {total} </p>
            {/* purchase button */}
            <button className={styles.purchaseButton} onClick={purchase}>
              Purchase
            </button>
          </div>
          <div className={styles.outerContainer}>
            {/* traversing over the cart array using cart.map method */}
            {cart.map((cartItem) => {
              return (
                <div className={styles.innerContainer} key={cartItem.id}>
                  <div className={styles.imageContainer}>
                    <img
                      src={cartItem.image}
                      alt="product_image"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.titleContainer}>
                    <h3 className={styles.title}>{cartItem.title}</h3>
                  </div>
                  <div className={styles.priceContainer}>
                    <h3 className={styles.price}>₹ {cartItem.price}</h3>
                  </div>
                  <div className={styles.buttons}>
                    <div
                      className={styles.increaseButton}
                      onClick={() =>
                        dispatch(
                          addingProductInCartAsync({
                            id: cartItem.id,
                            image: cartItem.image,
                            title: cartItem.title,
                            price: cartItem.price,
                          })
                        )
                      }
                    >
                      <img
                        src={increase}
                        alt="increase button"
                        className={styles.increase}
                      />
                    </div>
                    <div className={styles.quantityValue}>
                      <h3 className={styles.quantity}> {cartItem.qty}</h3>
                    </div>
                    <div
                      className={styles.decreaseButton}
                      onClick={() => dispatch(removeFromCartAsync(cartItem.id))}
                    >
                      <img
                        src={decrease}
                        alt="decrease button"
                        className={styles.decrease}
                      />
                    </div>
                  </div>
                  <div className={styles.cart_btn}>
                    <button
                      className={styles.btn}
                      onClick={() =>
                        dispatch(removeCartProductAsync(cartItem.id))
                      }
                    >
                      Remove From Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1> Cart is Empty!</h1>
      )}
    </>
  );
};

export default Cart;
