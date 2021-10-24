import React from "react";
import  Contact from "./homepage/HomePageComp/Contact";

function ContactP({ lng }) {
  const lang = lng;

  return (
    <div className="page contact">
      <Contact lng={lang} />
    </div>
  );
}

export default ContactP;
