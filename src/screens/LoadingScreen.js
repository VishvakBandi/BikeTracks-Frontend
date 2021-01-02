import { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/authContext";

// general purpose loading screen
const LoadingScreen = () => {
  // create context that will trigger a rerender when AuthContext sees a local sign-in token
  const { tryLocalSignIn } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return null;
};

export default LoadingScreen;
