import type {ReactNode} from "react";
import {useEffect} from "react";
import {useAuth} from "./AuthProvider";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({children}: PrivateRouteProps) {
  const {user, loading, login} = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      login(); // redirect to /oauth2/authorize
    }
  }, [loading, user, login]);

  if (loading) return <div>Loading…</div>;

  if (!user) return <div>Redirecting to sign-in…</div>;

  return children;
}
