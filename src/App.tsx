import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { NewsArticleDetails } from "./components/NewsArticleDetails";
import NewsComponent from "./components/NewsComponent";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/AuthDetails";

function App() {
  return (
    <Router>
      <Fragment>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={
                <AuthDetails>
                  <NewsComponent />
                </AuthDetails>
              }
            />
            <Route
              path="/articles/:id"
              element={
                <AuthDetails>
                  <NewsArticleDetails />
                </AuthDetails>
              }
            />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
