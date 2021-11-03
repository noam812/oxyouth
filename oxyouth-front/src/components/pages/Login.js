import React, { useState } from "react";
import { Route, Redirect } from "react-router";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


//   onAuthStateChanged(auth, (currentUser) => {
//     setAdmin(currentUser);
//   });

  const login = async () => {
    setErrorMessage("");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    } finally {
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
  
      <div className="login">
        <h1> הכנס פרטים</h1>
        <h3> Login </h3>
        <input
          className="field"
          placeholder="Email..."
          value={loginEmail}
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          className="field"
          placeholder="Password..."
          value={loginPassword}
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
        {errorMessage}

        

        <button onClick={logout}> Sign Out </button>
      </div>

  );
}

export default Login;
