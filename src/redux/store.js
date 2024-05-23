import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducer";
import { productReducer } from "./reducers/productReducer";
import { authReducer } from "./reducers/authReducer";

// here i have created store component in which i am saving all the
// reducers that were created using configureStore
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
