import {ReactNode, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {UserManager} from "oidc-client-ts";
import {oidcConfig} from "../auth/authConfig";

export default function Callback() {
  const navigate = useNavigate();
  useEffect(() => {
    const userManager = new UserManager(oidcConfig);
    userManager.signinRedirectCallback().then(() => {
      navigate("/");
    });
  }, [navigate]);

  return <div>Signing in...</div>;
}
