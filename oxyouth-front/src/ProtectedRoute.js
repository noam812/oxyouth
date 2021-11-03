import React from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "./components/firebaseConfig";

function ProtectedRoute({ isAuth, component: Component, ...rest  }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth === true) {
          return (<Component {...props} />);
        }
         else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
