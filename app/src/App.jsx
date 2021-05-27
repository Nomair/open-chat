import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavBar, Home, Login, NotFound } from "./views";
import { PublicRoute, PrivateRoute } from "./components";
import client from "./apollo";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
