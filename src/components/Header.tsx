import React from 'react';
import { Link } from 'react-router-dom';

import LoginModal from './LoginModal';
import { UserLogin } from '../models/User.interface';

// interface State {
//     loginModal: boolean,
//     signupModal: boolean,
// }

interface Props {
    hideLogin: () => void,
    showLogin: () => void,
    handleLogin: (user: UserLogin) => void,
    displayLoginModal: boolean,
    error: string | null,
}

class Header extends React.Component<Props, {}> {
    // state: State = {
    //     loginModal: false,
    //     signupModal: false,
    // }

    // showLogin = (): void => {
    //     this.setState({
    //         loginModal: true,
    //     });
    // }

    // hideLogin = (): void => {
    //     this.setState({
    //         loginModal: false,
    //     });
    // }

    render(): JSX.Element {
        const protectedLinks = (
            <>
                <Link className="nav-link" to="/">Dashboard</Link>
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
                <Link className="nav-link" to="/">Sign Up</Link>
            </>
        )
        const auth = localStorage.getItem('auth');
        return (
            <header>
                <nav>
                    <Link className="nav-link" to="/">How it Works</Link>
                </nav>
                <Link to="/"><h1 className="main-title">Meal Planner</h1></Link>
                <nav>
                    { auth ? protectedLinks : loginLinks }
                </nav>
            </header>
        );
    }
}

// const Header = (): JSX.Element => {
//     const protectedLinks = (
//         <>
//             <Link className="nav-link" to="/">Dashboard</Link>
//         </>
//     )
//     const loginLinks = (
//         <>
//             <Link className="nav-link" to="/">Login</Link>
//             <Link className="nav-link" to="/">Sign Up</Link>
//         </>
//     )
//     const auth = localStorage.getItem('auth');
//     return (
//         <header>
//             <nav>
//                 <Link className="nav-link" to="/">How it Works</Link>
//             </nav>
//             <Link to="/"><h1 className="main-title">Meal Planner</h1></Link>
//             <nav>
//                 { auth ? protectedLinks : loginLinks }
//             </nav>
//         </header>
//     );
// }

export default Header;