// import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import createDataContext from "./createDataContext";
import trackerAPI from "../API/tracker";
import { navigate } from "../navigationRef";

// reducer that gets called with dispatch functions
// returns an error message and payload
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { ...state, token: action.payload };
    case "clear_error_message":
      return { ...state, errorMesage: "" };
    default:
      return state;
  }
};

// helper function to check if the user already has a token
const tryLocalSignIn = (dispatch) => async () => {
  // gets token from local phone storage (if it exists)
  const token = await AsyncStorage.getItem("token");

  // if we have a valid token dispath a sign in and navigate to the TrackList screen
  // otherwise, go to the login screens
  if (token) {
    dispatch({ type: "signin", payload: "token" });
    navigate("TrackList");
  } else {
    navigate("LoginFlow");
  }
};

// clear the error message on the login screen
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

// helper function to process a signup request
const signup = (dispatch) => {
  return async ({ email, password }) => {
    // make API request to sign up
    // if the sign up works, modify state to let rest of the app know the auth was successful
    // if the request doesn't work, display the error ot the user
    try {
      // send a post request to signup w/ an email and password
      // wait for the token to be created and validated
      // dispatch to the reducer with type signup and the token
      const response = await trackerAPI.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signup", payload: response.data.token });

      // navigate to main flow (the next screen you see when you sign in)
      navigate("TrackList");
    } catch (err) {
      // send the error to the console
      console.log(err.message);

      // dispatch an error message to the reducer
      dispatch({
        type: "add_error",
        payload: "Something went wrong, sign up later",
      });
    }
  };
};

// helper function to process a signin
const signin = (dispatch) => {
  return async ({ email, password }) => {
    // make API request to sign in
    // if the sign in works, modify state to let rest of the app know the auth was successful
    // if it fails, send an error
    try {
      // send a post request to signin with email/password
      // wait for the token to be validated locally
      // dispatch a sign in with signin and the token
      const response = await trackerAPI.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });

      // send the user to the main flow/next screen
      navigate("TrackList");
    } catch (err) {
      // error handling
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong, try again later",
      });
    }
  };
};

// helper function for signout
const signout = (dispatch) => {
  return async () => {
    // make API request to sign out
    // remove the token from storage
    // dispatch a signout request
    // navigate to the signin screen
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout", payload: null });
    navigate("SignIn");
  };
};

// call createDataContext with the functions above
// a provider and context are returned
export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
