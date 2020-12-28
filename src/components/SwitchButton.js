import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import Spacer from "./Spacer";

const SwitchButton = ({ onSubmit, message }) => {
  return (
    <>
      <TouchableOpacity onPress={() => onSubmit()}>
        <Spacer>
          <Text style={styles.link}>{message}</Text>
        </Spacer>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
});

export default SwitchButton;
