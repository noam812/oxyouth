import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Articles from "./components/pages/Articles";
import Products from "./components/pages/Products";
import Faq from "./components/pages/Faq";
import Contact from "./components/pages/Contact";
import Homepage from "./components/pages/homepage/Homepage";
import Admin from "./Admin/Admin";
import ProductSinglePage from "./components/pages/ProductSinglePage";
import ArticleSinglePage from "./components/pages/ArticleSinglePage";

function Main({ lng }) {

  const ArticlesPage = () => {
    return <Articles />;
  };

  
  const ArticleSingular = () => {
    return <ArticleSinglePage lng={lang} />;
  };
  const lang = lng;
  const HomePage = () => {
    return <Homepage lng={lang} />;
  };

  const ContactPage = () => {
    return <Contact />;
  };

  const ProductsPage = () => {
    return <Products lng={lang} />;
  };
  const ProductSingular = () => {
    return <ProductSinglePage lng={lang} />;
  };

  const FaqPage = () => {
    return <Faq lng={lang}  />;
  };

  const AdminPage = () => {
    return <Admin />;
  };

  return (
   
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/ar" exact component={HomePage} />
        <Route path="/products" exact component={ProductsPage} />
        <Route path="/products/:id" exact component={ProductSingular} />
        <Route path="/ar/products" exact component={ProductsPage} />
        <Route path="/ar/products/:id" exact component={ProductSingular} />
        <Route path="/articles" exact component={ArticlesPage} />
        <Route path="/articles/:id" exact component={ArticleSingular} />
        <Route path="/ar/articles" exact component={ArticlesPage} />
        <Route path="/ar/articles/:id" exact component={ArticleSingular} />
        <Route path="/contact" exact component={ContactPage} />
        <Route path="/ar/contact" exact component={ContactPage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/ar/faq" component={FaqPage} />
        <Route path="/admin" exact component={AdminPage} />
      </Switch>
   
  );
}

export default Main;
