import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

// app screens
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import LoadingScreen from "./src/screens/LoadingScreen";

import { Provider as AuthProvider } from "./src/context/authContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/trackContext";
import { setNavigator } from "./src/navigationRef";

// generic navigator, shows 1 screen at a time, in order
const switchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  
  // stack navigator for the signin/up screens
  loginFlow: createStackNavigator({
    SignUp: SignupScreen,
    SignIn: SigninScreen,
  }),

  // bottom tab navigator for the main app
  // has the track data view, create, and account screen
  mainFlow: createBottomTabNavigator({
    // stack navigator for the track lists/details
    // using bottom tab still gives you the create and account options
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetails: TrackDetailScreen,
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

// export provider wrappers and the main navigator object
export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
