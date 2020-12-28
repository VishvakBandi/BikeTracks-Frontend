import React, { useReducer } from "react";

// reuseable data context component
// example call - createDataContext(authReducer, { signin, signout, signup, clearErrorMessage, tryLocalSignIn },
// { token: null, errorMessage: "" });

// pass in the reducer, different actions the reducer can take, and the default token contents
// in the example, we passs in the reducer function (switch statement), the 5 different actions/functions the switch statement can do,
// and the default token value
export default (reducer, actions, defaultValue) => {
  // create new context
  const Context = React.createContext();

  // create new provider
  const Provider = ({ children }) => {
    // create new state using a reducer
    const [state, dispatch] = useReducer(reducer, defaultValue);

    // array of actions to take
    const boundActions = {};

    // map each element in the array to an actions dispatch function (the state update function)
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    // return the children wrapped in the provider
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  // return initialized context and provider
  return { Context: Context, Provider: Provider };
};
