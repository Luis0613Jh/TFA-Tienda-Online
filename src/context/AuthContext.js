import React, { useState, useEffect } from "react";
import { watcherUserChanges } from "services/firebase/watcher";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

function AuthContextProvider(props) {
  const [authUser, setAuthUser] = useState({
    authReady: false,
    isLoggedIn: false,
    user: null,
  });
  useEffect(() => {
    watcherUserChanges((user) => {
      if (user) {
        setAuthUser({
          authReady: true,
          isLoggedIn: true,
          user,
        });
      } else {
        setAuthUser({
          authReady: true,
          isLoggedIn: false,
          user: null,
        });
      }
    });
  }, []);
  return <Provider value={authUser}>{props.children}</Provider>;
}
export { AuthContext, AuthContextProvider };
