import React from "react";
import styles from "../../styles/Order.module.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { purchasedItemsSelector } from "../../redux/reducers/cartReducer"; // Use the new selector
import { totalValue } from "../../redux/reducers/cartReducer";
const Order = () => {
  const date = new Date(); // call Date function
  const formattedDate = moment(date).format("YYYY-MM-DD"); // show the date
  // using momemt library in "YYYY-MM-DD" format and save value in formattedDate
  // call purchasedItems array by calling useSelector and passing purchasedItemsSelector inside it
  // and saving the value inside purchasedItems array
  const purchasedItems = useSelector(purchasedItemsSelector);
  // storing value of total combined price of all items inside total variable using
  // useSelector and passing totalValue inside useSelector
  const total = useSelector(totalValue);

  return (
    <div className={styles.outerContainer}>
      <h1> Your Orders</h1>
      {/* map over purchasedItems array and show result in table format */}
      {purchasedItems.map((cartItem) => {
        return (
          <>
            <h3 className={styles.orderDate}>Ordered On:- {formattedDate} </h3>
            <table className={styles.tableContainer}>
              <thead>
                <tr>
                  <th className={styles.titleHead}>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.titleBody}>{cartItem.title}</td>
                  <td>₹ {cartItem.price}</td>
                  <td>{cartItem.qty}</td>
                  <td>{cartItem.qty * cartItem.price}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} style={{ textAlign: "right" }}>
                    {total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </>
        );
      })}
    </div>
  );
};

export default Order;
