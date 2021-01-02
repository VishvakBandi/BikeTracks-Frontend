import "../_mockLocation";

import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Map from "../components/Map";
import { SafeAreaView, withNavigationFocus } from "react-navigation";

import { Context as LocationContext } from "../context/LocationContext";
import TrackForm from "../components/TrackForm";


import useLocation from "../hooks/useLocation";

// screen to start a new tracking session
// pass in the isFocused prop
const TrackCreateScreen = ({ isFocused }) => {
  // screen refreshed if recording or addLocation are changed
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);

  // callback function to add data to the map
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
