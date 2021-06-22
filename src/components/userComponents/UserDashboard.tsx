import { Link } from 'react-router-dom';

import User from '../../models/User.interface';

interface Props {
    user: User | null,
    error: string | null,
}

const UserDashboard = (props: Props): JSX.Element => {
    if (!props.user) return <h1>Loading...</h1>
    return (
        <div className="dashboard-container">
            <div className="dashboard-title-container">
                <h1 className="dashboard-title">{props.user.username}</h1>
                <div className="actions">
                    <Link to="/dashboard/edit" className="btn cancel-btn">Edit</Link>
                    <p className="btn delete-btn">Delete</p>
                </div>
            </div>
            { props.error && <h3>{props.error}</h3>}
        </div>
    );
}

export default UserDashboard;