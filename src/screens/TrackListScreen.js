import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TrackDetailScreen from "./TrackDetailScreen";

const TrackListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>track list screen</Text>
      <Button
        title="Go to Track Detail"
        onPress={() => {
          navigation.navigate("TrackDetails");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
