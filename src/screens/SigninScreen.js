import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationEvents } from "react-navigation";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import AuthForm from "../components/AuthForm";
import SwitchButton from "../components/SwitchButton";
import { Context as AuthContext } from "../context/authContext";

const SigninScreen = ({ navigation }) => {
  // context
  // refresh screen if we do things to the data
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  
  // displays optional error message
  // shows a AuthFrom component
  // shows a button with the option to move to sign up screen
  // option to go to the TrackList if authenticated
  return (
    <View style={styles.container}>
      <NavigationEvents
        // onWillFocus gets called when we are navigating to a screen
        onWillFocus={clearErrorMessage}
        // onDidFocus gets called once we are on a screen
        // onDidFocus={() => {}}
        // onWillBlur gets called once we are navigating away from a screen
        // onWillBlur={() => {clearErrorMessage()}}
        // onDidBlur gets called once we are on a screen we navigated away to
        // onDidBlur={()=> {}}
      />
      <AuthForm
        HeaderText="Sign in to Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <SwitchButton
        onSubmit={() => navigation.navigate("SignUp")}
        message="Don't have an account? Sign up instead"
      />
      <Button
        title="Go to main flow"
        onPress={() => {
          navigation.navigate("TrackList");
        }}
      />
    </View>
  );
};

// sets no default header to the screen
SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});
export default SigninScreen;
