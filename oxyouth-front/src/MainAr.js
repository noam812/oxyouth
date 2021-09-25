import React from "react";
import { Route } from "react-router";
import Articles from "./components/pages/Articles";
import Products from "./components/pages/Products";
import Faq from "./components/pages/Faq";
import Contact from "./components/pages/Contact";
import Homepage from "./components/pages/homepage/Homepage";
function Main() {
    
  const ArticlesPage = () => {
    return <Articles />;
  };

  const HomePage = () => {
    return <Homepage />;
  };

  const ContactPage = () => {
    return <Contact />;
  };

  const ProductsPage = () => {
    return <Products />;
  };

  const FaqPage = () => {
    return <Faq />;
  };
  return (
    <div>
      <Route path="/ar" exact component={HomePage} />
      <Route path="/ar/products" exact component={ProductsPage} />
      <Route path="/ar/articles" exact component={ArticlesPage} />
      <Route path="/ar/contact" exact component={ContactPage} />
      <Route path="/ar/faq" component={FaqPage} />
    </div>
  );
}

export default Main;
