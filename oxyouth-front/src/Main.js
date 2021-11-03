import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ArticlesP from "./components/pages/Articles";
import Products from "./components/pages/Products";
import Faq from "./components/pages/Faq";
import ContactP from "./components/pages/Contact";
import Homepage from "./components/pages/homepage/Homepage";
import Admin from "./Admin/Admin";
import ProductSinglePage from "./components/pages/ProductSinglePage";
import ArticleSinglePage from "./components/pages/ArticleSinglePage";
import Login from "./components/pages/Login";
import { auth } from "./components/firebaseConfig";
import { AdminUID } from "./config";
import { onAuthStateChanged } from "@firebase/auth";
import ProtectedRoute from "./ProtectedRoute";

/**
 * @Main - containes all frontEnd routing and components.
 *
 */
function Main({ lng ,isAuth }) {
  // const [loginState, setLoginState] = useState(true);

  // onAuthStateChanged(auth, (user) => {
  //   if (user?.uid === AdminUID) {
  //     setLoginState(true);
  //   } else {
  //     setLoginState(false);
  //   }
  // });

  const lang = lng;

  const ArticlesPage = () => {
    return <ArticlesP lng={lang} />;
  };

  const ArticleSingular = () => {
    return <ArticleSinglePage lng={lang} />;
  };
  const HomePage = () => {
    return <Homepage lng={lang} />;
  };

  const ContactPage = () => {
    return <ContactP lng={lang} />;
  };

  const ProductsPage = () => {
    return <Products lng={lang} />;
  };
  const ProductSingular = () => {
    return <ProductSinglePage lng={lang} />;
  };

  const FaqPage = () => {
    return <Faq lng={lang} />;
  };

  const AdminPage = () => {
    return <Admin />;
  };

  const LoginPage = () => {
    return <Login />;
  };

  return (
    // TODO: route duplication
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
      <ProtectedRoute
        path="/admin"
        exact
        component={AdminPage}
        isAuth={isAuth}
      />
      <Route path="/login" exact component={LoginPage} />
    </Switch>
  );
}

export default Main;
