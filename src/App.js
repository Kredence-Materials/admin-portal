import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../src/components/header/Header";
import Footer from "../src/components/footer/Footer";

import SearchForm from "../src/components/SearchForm/SearchForm";
import UploadForm from "../src/components/UploadForm/UploadForm";
import Login from "../src/components/Login/Login";

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path={["/", "/upload"]} component={UploadForm} />
          <Route exact path="/search" component={SearchForm} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
