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

const Header = (props: Props): JSX.Element => {
    const protectedLinks = (
        <>
            <Link className="nav-link" to="/recipes">Recipes</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/" onClick={props.handleLogout}>Logout</Link>
        </>
    )
    const loginLinks = (
        <>
            <p className="nav-link" onClick={props.showLogin}>Login</p>
            <LoginModal 
                display={props.displayLoginModal} 
                showLogin={props.showLogin} 
                hideLogin={props.hideLogin}
                handleLogin={props.handleLogin}
                error={props.error} />
            <SignupModal 
                display={props.displaySignupModal} 
                showSignup={props.showSignup} 
                hideSignup={props.hideSignup}
                handleSignup={props.handleSignup}
                error={props.error} />
            <p className="nav-link" onClick={props.showSignup}>Sign Up</p>
        </>
    )
    const auth = props.auth;
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

export default Header;