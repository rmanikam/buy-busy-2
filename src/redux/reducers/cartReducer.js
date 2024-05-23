import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

// created initialState which stores an object value consisting of cart array and purchasedItems array
// and total variable
// initialized cart and purchasedItems array as empty intially and total as 0 initially
const initialState = {
  cart: [],
  purchasedItems: [],
  total: 0,
};

//  calling addingProductInCartAsync function/action and using createAsyncThunk func. in this
// createAsyncThunk func I am getting response from axios.get and using thunk.API to
// dispatch an action of addtoCard. in the actions.addToCard I am passing product object
// consisting of  id, image , title, price.

export const addingProductInCartAsync = createAsyncThunk(
  "cart/addToCard",
  async (product, thunkAPI) => {
    // async calls
    try {
      await axios.get("https://fakestoreapi.com/products");
      thunkAPI.dispatch(actions.addToCard(product));
    } catch (error) {
      console.log(error);
    }
  }
);

// calling removeFromCartAsync function/action and using createAsyncThunk func. in this
// createAsyncThunk func I am getting response from axios.get and passing id to the api and
//  using thunk.API to dispatch an action of decreaing quantity of product from cart. in the actions.removeFromCart
// I am passing id of the product i have to decrease quantity of.
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (id, thunkAPI) => {
    try {
      await axios.get(`https://fakestoreapi.com/products/${id}`);
      thunkAPI.dispatch(actions.removeFromCart(id));
    } catch (error) {
      console.log(error);
    }
  }
);

// calling removeCartProductAsync function/action and using createAsyncThunk func. in this
// createAsyncThunk func I am getting response from axios.get and passing id to the api and
//  using thunk.API to dispatch an action of removeCartProduct from cart. in the actions.removeCartProduct
// I am passing id of the product that i have to remove from the Cart Component.
export const removeCartProductAsync = createAsyncThunk(
  "cart/removeCartProduct",
  async (id, thunkAPI) => {
    try {
      await axios.get(`https://fakestoreapi.com/products/${id}`);
      thunkAPI.dispatch(actions.removeCartProduct(id));
    } catch (error) {
      console.log(error);
    }
  }
);

// Define the resetCart action
export const resetCart = () => ({
  type: "cart/resetCart",
});

// created a cartSlice variable using createSlice method
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // calling purchaseItems reducer
    purchaseItems: (state, action) => {
      state.purchasedItems = [...action.payload]; // Store purchased items
    },
    // calling addToCard reducer where i am increasing quantity of product
    addToCard: (state, action) => {
      // getting index of cart product
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      // if product is not there in cart Component as
      // index === -1 then first time make the quantity of product to 1 otherwise
      // increase the quantity of same product to more than 1
      if (index === -1) {
        state.cart.push({ ...action.payload, qty: 1 });
        state.total += action.payload.price;
        // calling toast when cart product is added
        toast.success("Product Added Successfully!");
      } else {
        state.cart[index].qty++;
        state.total += state.cart[index].price;
        // calling toast when quantity of same cart product is increased by more than 1
        toast.success("Increased Product Count");
      }
    },
    // calling removeFromCart reducer where i am decreasing quantity of product
    removeFromCart: (state, action) => {
      // getting index of cart product
      const index = state.cart?.findIndex((item) => item.id === action.payload);
      // if product is  there in cart Component as
      // index !== -1 then decrease the quantity of product by 1. if quantity become
      //  0 then decrease the total as well remove the product from the cart otherwise
      // keep decreasing the total if quantity is not 0

      if (index !== -1) {
        if (state.cart[index].qty >= 1) {
          state.cart[index].qty--;
          if (state.cart[index].qty === 0) {
            state.total -= state.cart[index].price;
            state.cart.splice(index, 1);
          } else {
            state.total -= state.cart[index].price;
          }
        }
      }
    },
    // calling removeCartProduct reducer where i am removing the cart product from cart component
    // and if (state.cart.length === 0) then making total to 0. else decresing the
    // total using formula given below

    removeCartProduct: (state, action) => {
      const index = state.cart?.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        if (state.cart.length === 0) {
          state.total = 0;
        } else {
          state.total -= state.cart[index].price * state.cart[index].qty;
        }
        state.cart.splice(index, 1);
        // calling toast when cart product is removed
        toast.success("Product Removed Successfully!");
      }
    },

    // Define the resetCart reducer
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const actions = cartSlice.actions;

export const purchasedItemsSelector = (state) => state.cart.purchasedItems; // New selector for purchased items

export const cartSelector = (state) => state.cart.cart;

export const totalValue = (state) => state.cart.total;
