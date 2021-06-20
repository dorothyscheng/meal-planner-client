import { Link } from 'react-router-dom';

const Header = (): JSX.Element => {
    const protectedLinks = (
        <>
            <Link className="nav-link" to="/">Dashboard</Link>
        </>
    )
    const loginLinks = (
        <>
            <Link className="nav-link" to="/">Login</Link>
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

export default Header;