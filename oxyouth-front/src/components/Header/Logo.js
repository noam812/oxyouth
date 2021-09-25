import React from "react";
import { Link } from "react-router-dom";

function Logo({ logo }) {
  return (
    <div>
      <div className="logo">
        <Link to="/">
          <img className="logo icon" src={logo} alt="logo" />
        </Link>
      </div>
    </div>
  );
}

export default Logo;
