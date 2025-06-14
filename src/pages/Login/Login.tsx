import "./Login.scss";
import {Form, useLocation} from "react-router-dom";
import {use, useEffect, useState} from "react";
import {MdEmail, MdOutlineLogin, MdOutlinePassword} from "react-icons/md";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  function toggleRegistering() {
    setIsRegistering(prev => !prev);
  }

  function handleRegister() {
    // todo: implement the function, if successful go back to /login
  }

  function handleLogin() {
    // todo: implement the function, if successful go back to the previous page, if there is no previous page go to '/'
  }

  useEffect(() => {
    // todo: if user has been already authenticated, go back to the previous page, if there is no previous page go to '/'
  }, []);

  return (

      <div className="container">

        <div className="header">
          <span>{isRegistering ? "Register" : "Login"}</span>
          <button onClick={toggleRegistering}>{isRegistering ? "Login" : "Register"}</button>
        </div>

        <form>

          <div className="credential-card">
            <label className=" credential-card-header">
              <MdEmail/><input type="text" placeholder="Email" autoFocus={true}/>
            </label>
          </div>

          <div className="credential-card">
            <label className=" credential-card-header">
              <MdOutlinePassword/><input type="password" placeholder="Password"/>
            </label>
          </div>

          {isRegistering &&
              <div className="credential-card">
                  <label className=" credential-card-header">
                      <MdOutlinePassword/><input type="password" placeholder="Repeat Password"/>
                  </label>
              </div>
          }

          <button type="submit" onSubmit={isRegistering ? handleRegister : handleLogin}>
            <div className="credential-card-header">
              <MdOutlineLogin/><span>{isRegistering ? "Register" : "Login"}</span>
            </div>
          </button>

        </form>
      </div>
  );
}