import { useState } from "react";
import { createContext, useContext } from "react";

/**
 * Context for managing state across components.
 * @type {React.Context}
 */
const Context = createContext();

/**
 * Hook to access the context value.
 * @returns {object} Context value
 */
export function UseContextValue() {
  return useContext(Context);
}

/**
 * Context provider component to manage state.
 * @param {object} props - React component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} ContextProvider component
 */
export default function ContextProvider({ children }) {
  const [userLogIn, setUserLogIn] = useState("NoneUserLoggedIn");
  const [phase, setPhase] = useState("signUpPhase");
  const [favourite, setFavourite] = useState({
    favouriteShowTitle: "",
    favouriteSeasonTitle: "",
  });
  const [phaseState, setPhaseState] = useState({
    Preview: [],
    DefaultPreview: [],
    Season: "",
    Episode: "",
  });
  const [showDescription, setShowDescription] = useState();
  const [showImage, setShowImage] = useState();
  const [search, setSearch] = useState("");

  return (
    <Context.Provider
      value={{
        phase,
        setPhase,
        favourite,
        setFavourite,
        phaseState,
        setPhaseState,
        showDescription,
        setShowDescription,
        showImage,
        setShowImage,
        userLogIn,
        setUserLogIn,
        search,
        setSearch,
      }}
    >
      {children}
    </Context.Provider>
  );
}
