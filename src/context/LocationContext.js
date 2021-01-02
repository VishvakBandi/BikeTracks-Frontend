import createDataContext from "./createDataContext";
// reducer that gets called with dispatch functions
// returns an error message and payload depending on the case
const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    case "start_recording":
      return { ...state, recording: true };
    case "stop_recording":
      return { ...state, recording: false };
    case "add_location":
      console.log(state.locations.length);
      return { ...state, locations: [...state.locations, action.payload] };
    case "change_name":
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

// function for changing the name of the track
const changeName = (dispatch) => (name) => {
  // dispatch with the new name
  dispatch({ type: "change_name", payload: name });
};

// start recording 
const startRecording = (dispatch) => () => {
  // dispatch a start recording command
  // command sets recording to true
  dispatch({ type: "start_recording" });
};

// stop recording
const stopRecording = (dispatch) => () => {
  // dispatch a stop recording command
  // command sets recording to false
  dispatch({ type: "stop_recording" });
};

// save location to the array of location objects
const addLocation = (dispatch) => (location, recording) => {
  // dispatch add current recording
  // save the current location
  dispatch({ type: "add_current_location", payload: location });

  // if currently recording, also dispatch add location
  // add the location to the previous array of location objects
  if (recording) {
    dispatch({ type: "add_location", payload: location });
  }
};

// call createDataContext with the functions above
// returns a provider and context are returned
export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName },
  { name: "", recording: false, locations: [], currentLocation: null }
);
