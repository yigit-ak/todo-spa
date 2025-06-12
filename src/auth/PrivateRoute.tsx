// src/PrivateRoute.jsx
import {useEffect} from "react";
import {useAuth} from "./AuthProvider";

export default function PrivateRoute({children}) {
  const {user, loading, login} = useAuth();

  // Fire the OIDC redirect as soon as we know the user is missing
  useEffect(() => {
    if (!loading && !user) {
      login();                       //  ⬅️ redirects to /oauth2/authorize…
    }
  }, [loading, user, login]);

  // While AuthProvider is still checking sessionStorage, show a stub
  if (loading) return <div>Loading…</div>;

  // After we called login() we just keep a placeholder until we leave the page
  if (!user) return <div>Redirecting to sign-in…</div>;

  // Finally, render the protected content
  return children;
}
