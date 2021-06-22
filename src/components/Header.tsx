import React from 'react';
import { Link } from 'react-router-dom';

import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import User, { UserLogin } from '../models/User.interface';


interface Props {
    hideLogin: () => void,
    showLogin: () => void,
    handleLogin: (user: UserLogin) => void,
    handleLogout: () => void,
    displayLoginModal: boolean,
    error: string | null,
    displaySignupModal: boolean,
    hideSignup: () => void,
    showSignup: () => void,
    handleSignup: (user: User) => void,
    auth: User['username'] | null,
}

class Header extends React.Component<Props, {}> {
    render(): JSX.Element {
        const protectedLinks = (
            <>
                <Link className="nav-link" to="/recipes">Recipes</Link>
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                <Link className="nav-link" to="/" onClick={this.props.handleLogout}>Logout</Link>
            </>
        )
        const loginLinks = (
            <>
                <p className="nav-link" onClick={this.props.showLogin}>Login</p>
                <LoginModal 
                    display={this.props.displayLoginModal} 
                    showLogin={this.props.showLogin} 
                    hideLogin={this.props.hideLogin}
                    handleLogin={this.props.handleLogin}
                    error={this.props.error} />
                <SignupModal 
                    display={this.props.displaySignupModal} 
                    showSignup={this.props.showSignup} 
                    hideSignup={this.props.hideSignup}
                    handleSignup={this.props.handleSignup}
                    error={this.props.error} />
                <p className="nav-link" onClick={this.props.showSignup}>Sign Up</p>
            </>
        )
        const auth = this.props.auth;
        return (
            <header>
                <div className="header-content">
                    <Link to="/"><h1 className="main-title">Meal Planner</h1></Link>
                    <nav>
                        { auth ? protectedLinks : loginLinks }
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;