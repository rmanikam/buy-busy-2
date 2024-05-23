import React from "react";
import styles from "../../styles/ProductCard.module.css";
// import { useValue } from "../productContext";
import { addingProductInCartAsync } from "../../redux/reducers/cartReducer";
import { useDispatch } from "react-redux";
// destructure id, image, title, price inside the ProductCard function
const ProductCard = ({ id, image, title, price }) => {
  const dispatch = useDispatch(); //call useDispatch function

  // call handleAddToCart func and dispatch addingProductInCartAsync
  // function inside it and pass id, image, title, price values in form of object to it
  const handleAddToCart = () => {
    dispatch(addingProductInCartAsync({ id, image, title, price }));
  };
  return (
    <>
      {/* show all the product items */}
      <div className={styles.innerContainer}>
        <div className={styles.imageContainer}>
          <img src={image} alt="product_image" className={styles.image} />
        </div>

        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.priceContainer}>
          <h3 className={styles.price}>₹ {price}</h3>
        </div>
        <div className={styles.cart_btn}>
          <button className={styles.btn} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
