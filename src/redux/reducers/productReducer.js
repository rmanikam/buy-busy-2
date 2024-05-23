import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// created initialState which stores an object value consisting of products array and error variable
// initialized products array as empty intially and error as null initially
const initialState = {
  products: [],
  error: null,
};

// calling getIntialStateAync function/action and using createAsyncThunk func. in this createAsyncThunk func
// I am returning response from axios.get.
export const getInitialStateAsync = createAsyncThunk(
  "product/setInitialState",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get("https://fakestoreapi.com/products");
    } catch (error) {
      // Return a serialized error message
      return rejectWithValue(error.message);
    }
  }
);

// created a productSlice variable using createSlice method
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInitialStateAsync.fulfilled, (state, action) => {
      // update the state
      // state.products = action.payload; // action.payload is now serializable
      // we dont want to directly copy the reference
      // so we have to assign a new array and copy all
      // the elements inside the new array
      state.products = [...action.payload.data];
    });
    // for showing error
    builder.addCase(getInitialStateAsync.rejected, (state, action) => {
      state.error = action.payload || action.error.message;
    });
  },
});

// exporting  productReducer and saving value of productSlice.reducer in it
export const productReducer = productSlice.reducer;
// exporting actions and saving value of productSlice.actions in it
export const actions = productSlice.actions;

// here in productSelector i have to do
// state.product as in store.js, the value of productReducer is stored in product.
// reducer: {
//     product: productReducer,
// }

// exporting productSelector and saving value of state.product.products in it and state.product is coming from store.js
export const productSelector = (state) => state.product.products;
// exporting errorSelector and saving value of state.product.error in it and state.product is coming from store.js
export const errorSelector = (state) => state.product.error;
