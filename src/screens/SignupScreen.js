import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";

import SwitchButton from "../components/SwitchButton";
import { Context as AuthContext } from "../context/authContext";
import AuthForm from "../components/AuthForm";

const SignupScreen = ({ navigation }) => {
  // context
  // refresh screen if we do things to the data
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  // show auth form
  // show button to switch to signin screen
  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <SwitchButton
        onSubmit={() => navigation.navigate("SignIn")}
        message="Already have an account? Sign in instead"
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
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

export default SignupScreen;
