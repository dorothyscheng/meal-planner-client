import React from 'react';

import Routes from './config/Routes';

import './App.css';

interface State {
   
}

class App extends React.Component<{}, State> {
  render(): JSX.Element {
    return (
      <Routes />
    );
  }
}

export default App;
