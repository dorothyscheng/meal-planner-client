import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './config/Routes';
import User from './models/User.interface';
import Header from './components/Header';

import './App.css';

interface State {
   username: User['username'],
}

class App extends React.Component<{}, State> {
  state: State = {
    username: '',
  }

  render(): JSX.Element {
    return (
      <Router>
        <Header />
        <Routes />
      </Router>
    );
  }
}

export default App;
