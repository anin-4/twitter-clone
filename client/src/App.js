import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container } from "semantic-ui-react";
import SinglePost from "./pages/SinglePost";
import Edit from "./pages/Edit";
function App() {
  return (
    <Router>
      <Container>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/tweets/:postID" component={SinglePost} exact></Route>
          <Route path="/tweets/:postID/edit" component={Edit} exact></Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
