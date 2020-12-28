import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";

import Spacer from "./Spacer";

// reuseable form component that reads in email and password
// pass in custom headerTest, errorText, onSubmit function, and button text
const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  // 2 state objects for the email + password
  // auth screens use state later 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    // display header text
    // display the email input label, which updates the email state
    // display the password input label, which updates the password state
    // if auth fails, an error message appears
    // submit buttom at the bottom of the screen, which triggers the onSubmit function passed in
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default AuthForm;
