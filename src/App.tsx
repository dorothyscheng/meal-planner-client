import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './config/Routes';
import User, { UserLogin } from './models/User.interface';
import UserModel from './models/UserModel';
import Header from './components/Header';
import Footer from './components/Footer';
import List, { ListWithUser } from './models/List.interface';
import ListModel from './models/ListModel';

import './App.css';

interface errorMessage {
  message: string,
}

interface State {
   user: User | null,
   displayLoginModal: boolean,
   displaySignupModal: boolean,
   loginSignupError: string | null,
   updateMessage: string | null,
}

class App extends React.Component<{}, State> {
  state: State = {
    user: null,
    displayLoginModal: false,
    displaySignupModal: false,
    loginSignupError: null,
    updateMessage: null
  }

  isError = (response: errorMessage | User): response is errorMessage => {
    return (response as errorMessage).message !== undefined;
  }

  isListError = (response: errorMessage | List): response is errorMessage => {
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
            loginSignupError: response.message,
          });
        } else {
          this.setState({
            user: response,
            loginSignupError: null,
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
            loginSignupError: response.message,
          });
        } else {
          this.setState({
            user: response,
            loginSignupError: null,
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

  handleUserEdit = (username: User['username'], user: User): void => {
    UserModel.update(username, user)
      .then(response => {
        if (this.isError(response)) {
          this.setState({
            updateMessage: response.message,
          });
        } else {
          this.setState({
            user: response,
            updateMessage: 'Success!',
          });
          localStorage.setItem('auth', response.username);
        };
      });
  }

  handleUserDelete = (user: User): void => {
    UserModel.delete(user)
      .then(response => {
        if (this.isError(response)) {
          this.setState({
            updateMessage: response.message,
          });
        } else {
          this.setState({
            user: null,
            updateMessage: null,
          });
          localStorage.clear();
        };
      });
  }

  handleCreateList = (listWithUser: ListWithUser): void => {
    ListModel.create(listWithUser)
      .then(response => {
        if (this.isListError(response)) {
          this.setState({
            updateMessage: response.message,
          });
        } else {
          if (this.state.user) {
            let user = this.state.user;
            if (!user.lists) {
              user.lists = [];
            };
            user.lists.push(response);
            this.setState({
              user: user,
            });
          };
        };
      });
  }

  fetchUserData = (username: User['username']): void => {
    UserModel.show(username)
      .then(response => {
        if (this.isError(response)) {
          this.setState({
            loginSignupError: response.message,
          });
        } else {
          this.setState({
            user: response,
            loginSignupError: null,
          });
        };
      });
  }

  componentDidMount() {
    const username = localStorage.getItem('auth');
    if (username) {
      this.fetchUserData(username);
    };
  }

  render(): JSX.Element {
    return (
      <div className="page-container">
        <div className="page-content">
          <Router>
            <Header 
              displayLoginModal={this.state.displayLoginModal} 
              showLogin={this.showLogin} 
              hideLogin={this.hideLogin} 
              handleLogin={this.handleLogin}
              error={this.state.loginSignupError}
              handleLogout={this.handleLogout}
              displaySignupModal={this.state.displaySignupModal}
              showSignup={this.showSignup}
              hideSignup={this.hideSignup}
              handleSignup={this.handleSignup}
              auth={this.state.user ? this.state.user.username : null} />
            <Routes 
              user={this.state.user} 
              updateMessage={this.state.updateMessage} 
              handleUserEdit={this.handleUserEdit}
              handleUserDelete={this.handleUserDelete}
              auth={this.state.user ? this.state.user.username : null}
              handleCreateList={this.handleCreateList} />
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
