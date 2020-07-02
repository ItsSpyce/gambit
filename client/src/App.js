import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/navbar';
import Home from './pages/home';
import Game from './pages/game';
import userService from './services/userService';
import gameService from './services/gameService';
import theme from './theme';

const StyledApp = styled.div`
  margin: 0;
  color: ${theme.WHITE};
  background-color: ${theme.GRAY_4};
  font-family: 'Roboto', sans-serif;

  h1,
  h2,
  h3 {
    font-weight: 100;
  }
`;

const AppContent = styled.div`
  padding: 8px;
`;

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  useEffect(() => {
    if (!user) {
      userService.getCurrentUser().then((user) => {
        setUser(user);
        setIsLoggingIn(false);
      });
    }
  }, [user, setIsLoggingIn]);

  async function handleUsernameChange(name) {
    if (!user) {
      const loggedInUser = await userService.login(name);
      setUser(loggedInUser);
    } else {
      const didUpdate = await userService.changeUsername(name);
      if (didUpdate) {
        setUser({ ...user, name });
      } else {
        setUser(user);
      }
    }
  }

  return (
    <Router>
      <StyledApp>
        {!isLoggingIn && (
          <Navbar user={user} onUsernameChange={handleUsernameChange} />
        )}
        <AppContent>
          <Switch>
            <Route
              exact
              path="/"
              children={(props) => <Home {...props} user={user} />}
            ></Route>
            <Route
              path="/game/:id"
              children={(props) => <Game {...props} user={user} />}
            ></Route>
          </Switch>
        </AppContent>
      </StyledApp>
    </Router>
  );
};

export default App;
