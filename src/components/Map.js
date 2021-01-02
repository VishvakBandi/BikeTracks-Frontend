import React, { useContext } from "react";
import {  StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";

import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  // state for the location object and current location
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  // loading icon
  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    // map component, with the initial region shown being the current location, fairly zoomed in
    // add a fairly noticable circle on where the user is current located
    // draw a line between each of the locations recorded
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      /*
      region={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      */
    >
      <Circle
        center={currentLocation.coords}
        radius={20}
        strokeColor="rgba(158,158, 255, 1.0)"
        fillColor="rgba(158,158,255,0.3)"
      />

      <Polyline coordinates={locations.map((loc) => loc.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
