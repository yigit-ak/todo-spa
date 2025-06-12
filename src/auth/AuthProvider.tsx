import {createContext, useContext, useEffect, useState} from "react";
import {UserManager, WebStorageStateStore} from "oidc-client-ts";
import {oidcConfig} from "./authConfig.ts";

const AuthContext = createContext();

export const userManager = new UserManager({
  ...oidcConfig,
  userStore: new WebStorageStateStore({store: window.sessionStorage}),
});

export function AuthProvider({children}) {
  const [auth, setAuth] = useState({user: null, loading: true});

  useEffect(() => {
    // 1) initial load (fast if user is in sessionStorage)
    userManager.getUser()
        .then((u) => setAuth({user: u, loading: false}));

    // 2) keep React state in-sync with oidc-client events
    const onLoaded = (u) => setAuth({user: u, loading: false});
    const onSignedOut = () => setAuth({user: null, loading: false});

    userManager.events.addUserLoaded(onLoaded);
    userManager.events.addUserSignedOut(onSignedOut);

    return () => {
      userManager.events.removeUserLoaded(onLoaded);
      userManager.events.removeUserSignedOut(onSignedOut);
    };
  }, []);

  const login = () => userManager.signinRedirect();
  const logout = () => userManager.signoutRedirect();

  return (
      <AuthContext.Provider value={{...auth, login, logout}}>
  {children}
  </AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);
