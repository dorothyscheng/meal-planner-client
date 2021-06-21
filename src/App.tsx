import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './config/Routes';
import User, { UserLogin } from './models/User.interface';
import UserModel from './models/UserModel';
import Header from './components/Header';

import './App.css';

interface errorMessage {
  message: string,
}

interface State {
   user: User | null,
   displayLoginModal: boolean,
   error: string | null,
}

class App extends React.Component<{}, State> {
  state: State = {
    user: null,
    displayLoginModal: false,
    error: null,
  }

  showLogin = (): void => {
    this.setState({
        displayLoginModal: true,
    });
  }

  hideLogin = (): void => {
      this.setState({
          displayLoginModal: false,
      });
  }

  isError = (response: errorMessage | User): response is errorMessage => {
    return (response as errorMessage).message !== undefined;
  }

  handleLogin = (user: UserLogin): void => {
    UserModel.login(user)
      .then(response => {
        if (this.isError(response)) {
          this.setState({
            error: response.message,
          });
        } else {
          this.setState({
            user: response,
            error: null,
          });
        }
      });
  }

  render(): JSX.Element {
    return (
      <Router>
        <Header 
          displayLoginModal={this.state.displayLoginModal} 
          showLogin={this.showLogin} 
          hideLogin={this.hideLogin} 
          handleLogin={this.handleLogin}
          error={this.state.error} />
        <Routes />
      </Router>
    );
  }
}

export default App;
