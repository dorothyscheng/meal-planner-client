import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import User from '../../models/User.interface';
import UserDeleteModal from './UserDeleteModal';

interface Style {
    display: 'none' | 'flex',
}

interface Props {
    user: User | null,
    message: string | null,
    handleUserDelete: (user: User) => void,
}

interface State {
    redirect: boolean,
    deleteModalDisplay: boolean,
    messageDisplay: boolean,
}

class UserDashboard extends React.Component<Props, State> {
    state: State = {
        redirect: false,
        deleteModalDisplay: false,
        messageDisplay: false,
    }

    handleDelete = (): void => {
        if (this.props.user) {
            this.props.handleUserDelete(this.props.user);
            this.setState({
                redirect: true,
            });
        };
    }

    showDeleteModal = (): void => {
        this.setState({
            deleteModalDisplay: true,
        });
    }

    hideDeleteModal = (): void => {
        this.setState({
            deleteModalDisplay: false,
        });
    }

    dismissMessage = (): void => {
        this.setState({
            messageDisplay: false,
        })
    }

    componentDidMount() {
        if (this.props.message) {
            this.setState({
                messageDisplay: true,
            })
        }
    }

    render(): JSX.Element {
        let style: Style = {
            display: 'none',
        }
        if (this.state.messageDisplay) {
            style = {
                display: 'flex',
            }
        };
        if (this.state.redirect) return <Redirect to="/" />
        if (!this.props.user) return <h1>Loading...</h1>
        return (
            <div className="dashboard-container">
                <div className="dashboard-title-container">
                    <h1 className="dashboard-title">{this.props.user.username}</h1>
                    <div className="actions">
                        <Link to="/dashboard/edit" className="btn cancel-btn">Edit</Link>
                        <p className="btn delete-btn" onClick={this.showDeleteModal}>Delete</p>
                        <UserDeleteModal 
                            display={this.state.deleteModalDisplay} 
                            handleDelete={this.handleDelete}
                            hideDeleteModal={this.hideDeleteModal} />
                    </div>
                </div>
                { this.props.message && (
                    <div className="dash-message-div" style={style}>
                        <h3>{this.props.message}</h3>
                        <p className="dismiss-message" onClick={this.dismissMessage}>Dismiss</p>
                    </div>
                )}
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