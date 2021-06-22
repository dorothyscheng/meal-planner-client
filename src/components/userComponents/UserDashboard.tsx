import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import User from '../../models/User.interface';

interface Props {
    user: User | null,
    error: string | null,
    handleUserDelete: (user: User) => void,
}

interface State {
    redirect: boolean,
}

class UserDashboard extends React.Component<Props, State> {
    state: State = {
        redirect: false,
    }

    handleDelete = (): void => {
        if (this.props.user) {
            this.props.handleUserDelete(this.props.user);
            this.setState({
                redirect: true,
            });
        };
    }

    render(): JSX.Element {
        if (this.state.redirect) return <Redirect to="/" />
        if (!this.props.user) return <h1>Loading...</h1>
        return (
            <div className="dashboard-container">
                <div className="dashboard-title-container">
                    <h1 className="dashboard-title">{this.props.user.username}</h1>
                    <div className="actions">
                        <Link to="/dashboard/edit" className="btn cancel-btn">Edit</Link>
                        <p className="btn delete-btn" onClick={this.handleDelete}>Delete</p>
                    </div>
                </div>
                { this.props.error && <h3>{this.props.error}</h3>}
            </div>
        );
    }
}

// const UserDashboard = (props: Props): JSX.Element => {
//     if (!props.user) return <h1>Loading...</h1>
//     return (
//         <div className="dashboard-container">
//             <div className="dashboard-title-container">
//                 <h1 className="dashboard-title">{props.user.username}</h1>
//                 <div className="actions">
//                     <Link to="/dashboard/edit" className="btn cancel-btn">Edit</Link>
//                     <p className="btn delete-btn">Delete</p>
//                 </div>
//             </div>
//             { props.error && <h3>{props.error}</h3>}
//         </div>
//     );
// }

export default UserDashboard;