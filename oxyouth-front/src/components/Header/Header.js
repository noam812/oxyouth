import React from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";
import TransBtn from "./TransBtn";

function Header({ logo, t, lng }) {
  return (
    <div className="header">
      <TransBtn t={t} lng={lng} />
      <Navbar t={t} lng={lng} />
      <Logo logo={logo} />
    </div>
  );
}

export default Header;
