import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './config/Routes';
import User, { UserLogin } from './models/User.interface';
import UserModel from './models/UserModel';
import Header from './components/Header';
import Footer from './components/Footer';
import List from './models/List.interface';
import ListModel from './models/ListModel';
import Week from './models/Week.interface';
import WeekModel from './models/WeekModel';

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
   updatedWeek: Week | null,
   updatedList: List | null,
   redirectToDash: boolean,
}

class App extends React.Component<{}, State> {
  state: State = {
    user: null,
    displayLoginModal: false,
    displaySignupModal: false,
    loginSignupError: null,
    updateMessage: null,
    updatedWeek: null,
    updatedList: null,
    redirectToDash: false,
  }

  isError = (response: errorMessage | User): response is errorMessage => {
    return (response as errorMessage).message !== undefined;
  }

  isListError = (response: errorMessage | List): response is errorMessage => {
    return (response as errorMessage).message !== undefined;
  }

  isWeekError = (response: errorMessage | Week): response is errorMessage => {
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
          localStorage.setItem('auth', response.username);
          this.fetchUserData(response.username);
          this.setState({
            redirectToDash: true,
            displaySignupModal: false,
          });
        };
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
            redirectToDash: true,
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
      redirectToDash: false,
    });
  }

  resetRedirect = (): void => {
    this.setState({
      redirectToDash: false,
    })
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
            redirectToDash: false,
          });
          localStorage.clear();
        };
      });
  }

  handleCreateList = (list: List): void => {
    ListModel.create(list)
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

  handleUpdateList = (list: List): void => {
    ListModel.update(list)
      .then(response => {
        if (this.isListError(response)) {
          this.setState({
            updateMessage: response.message,
          });
        } else {
          if (this.state.user) {
            let user = {...this.state.user};
            if (!user.lists) {
              user.lists = [];
            };
            let lists = user.lists.filter(list => list._id !== response._id);
            lists.push(response);
            user.lists = lists;
            this.setState({
              user: user,
              updatedList: response,
            })
          }
        }
      })
  }

  handleDeleteList = (list: List): void => {
    ListModel.delete(list)
      .then(response => {
        if (this.isListError(response)) {
          this.setState({
            updateMessage: response.message,
          });
        } else {
          if (this.state.user) {
            let user = {...this.state.user};
            if (!user.lists) {
              user.lists = [];
            };
            user.lists = user.lists.filter(list => list._id !== response._id);
            this.setState({
              user: user,
            });
          };
        };
      });
  }

  handleCreateWeek = (week: Week): void => {
    WeekModel.create(week)
      .then(response => {
        if (this.isWeekError(response)) {
          this.setState({
            updateMessage: response.message,
          });
        } else {
          if (this.state.user) {
            let user = this.state.user;
            if (!user.weeks) {
              user.weeks = [];
            };
            user.weeks.push(response);
            this.setState({
              user: user,
            });
          };
        };
      });
  }

  handleUpdateWeek = (week: Week): void => {
    WeekModel.update(week)
      .then(response => {
        if (this.isWeekError(response)) {
          this.setState({
            updateMessage: response.message,
          });
        } else {
          if (this.state.user) {
            let user = {...this.state.user};
            if (!user.weeks) {
              user.weeks = [];
            };
            let weeks = user.weeks.filter(week => week._id !== response._id);
            weeks.push(response);
            user.weeks = weeks;
            this.setState({
              user: user,
              updatedWeek: response,
            });
          };
        };
      });
  }

  handleDeleteWeek = (week: Week): void => {
    WeekModel.delete(week)
      .then(response => {
        if (this.isWeekError(response)) {
          this.setState({
            updateMessage: response.message,
          });
        } else {
          if (this.state.user) {
            let user = {...this.state.user};
            if (!user.weeks) {
              user.weeks = [];
            };
            user.weeks = user.weeks.filter(week => week._id !== response._id);
            this.setState({
              user: user,
            })
          }
        }
      })
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
              handleCreateList={this.handleCreateList}
              handleUpdateList={this.handleUpdateList}
              handleDeleteList={this.handleDeleteList}
              handleCreateWeek={this.handleCreateWeek}
              handleUpdateWeek={this.handleUpdateWeek}
              handleDeleteWeek={this.handleDeleteWeek}
              updatedWeek={this.state.updatedWeek}
              updatedList={this.state.updatedList}
              redirectToDash={this.state.redirectToDash}
              resetRedirect={this.resetRedirect} />
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
