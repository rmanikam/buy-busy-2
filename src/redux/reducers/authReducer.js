import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
const firestore = getFirestore(); // calling getFirestore function

// saving data to firestore by calling saveUserDataToFirestore func
// and pass id, email, user name to it
const saveUserDataToFirestore = async (user) => {
  const userRef = doc(firestore, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || null,
  });
};

// calling registerUser function/action and using createAsyncThunk func. in this
// createAsyncThunk func I am destructuring email and password and passing it to
// createUserWithEmailAndPassword method from firebase/auth and getting returned value of user
// and calling saveUserDataToFirestore(user) and passing user inside it to save the user
// in the firestore database

export const registerUser = createAsyncThunk(
  "registerUser",
  async (credentials, { rejectWithValue }) => {
    const { email, password } = credentials;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //   return userCredential.user;

      const user = userCredential.user;
      await saveUserDataToFirestore(user);
      return user;
    } catch (error) {
      console.log("error");
      if (error.code === "auth/email-already-in-use") {
        // calling toast when email alreading exists
        toast.error("Error:auth/email-already-in-use");
        // navigate to signup page if user already exists
        const navigate = useNavigate();
        navigate("/signup");
      }
    }
  }
);

// calling loginUser function/action and using createAsyncThunk func. in this
// createAsyncThunk func I am destructuring email and password and passing it to
// signInWithEmailAndPassword method from firebase/auth and getting returned value of user
// and calling saveUserDataToFirestore(user).

export const loginUser = createAsyncThunk(
  "loginUser",
  async (credentials, { rejectWithValue }) => {
    const { email, password } = credentials;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        // calling toast when User not found
        toast.error("Error: User not found");
      } else {
        // calling toast when Wrong password is entered
        toast.error("Error: Wrong password");
        // calling toast when User not found
        // navigate to signin page if wrong email/password is entered
        const navigate = useNavigate();
        navigate("/signin");
      }
    }
  }
);

// created a authSlice variable using createSlice method
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// exporting authReducer and saving value of authSlice.reducer in it
export const authReducer = authSlice.reducer;
// exporting actions and saving value of authSlice.actions in it
export const actions = authSlice.actions;
// exporting authSelector and saving value of state.auth in it
export const authSelector = (state) => state.auth;
// exporting authError and saving value of state.auth in it
export const authError = (state) => state.auth;
