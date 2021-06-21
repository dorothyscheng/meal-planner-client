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
   displaySignupModal: boolean,
   error: string | null,
}

class App extends React.Component<{}, State> {
  state: State = {
    user: null,
    displayLoginModal: false,
    displaySignupModal: false,
    error: null,
  }

  isError = (response: errorMessage | User): response is errorMessage => {
    return (response as errorMessage).message !== undefined;
  }
  
  showSignup = (): void => {
    this.setState({
        displaySignupModal: true,
    });
  }

  hideSignup = (): void => {
      this.setState({
          displaySignupModal: false,
      });
  }

  handleSignup = (user: User): void => {
    UserModel.create(user)
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
          localStorage.setItem('auth', response.username);
          this.hideSignup();
        }
      });
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
          localStorage.setItem('auth', response.username);
          this.hideLogin();
        }
      });
  }

  handleLogout = (): void => {
    localStorage.clear();
    this.setState({
      user: null,
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
          error={this.state.error}
          handleLogout={this.handleLogout}
          displaySignupModal={this.state.displaySignupModal}
          showSignup={this.showSignup}
          hideSignup={this.hideSignup}
          handleSignup={this.handleSignup} />
        <Routes />
      </Router>
    );
  }
}

export default App;
