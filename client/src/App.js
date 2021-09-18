import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Auth from './components/Auth/Auth.js';
import Profile from './components/Profile/Profile.js';
import Users from './components/Users/Users.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" exact component={Auth} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/users" exact component={Users} />
          </Switch>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;