import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import User from '../../models/User.interface';
import UserDeleteModal from './UserDeleteModal';
import ListContainer from '../../containers/ListContainer';
import CreateListModal from '../listComponents/CreateListModal';
import List from '../../models/List.interface';

interface Style {
    display: 'none' | 'flex' | 'block',
}

interface Props {
    user: User | null,
    message: string | null,
    handleUserDelete: (user: User) => void,
    handleCreateList: (list: List) => void,
    handleUpdateList: (list: List) => void,
    handleDeleteList: (list: List) => void,
}

interface State {
    redirect: boolean,
    deleteModalDisplay: boolean,
    messageDisplay: boolean,
    createListModalDisplay: boolean,
}

class UserDashboard extends React.Component<Props, State> {
    state: State = {
        redirect: false,
        deleteModalDisplay: false,
        messageDisplay: false,
        createListModalDisplay: false,
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

    showCreateListModal = (): void => {
        this.setState({
            createListModalDisplay: true,
        })
    }

    hideCreateListModal = (): void => {
        this.setState({
            createListModalDisplay: false,
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
                <div className="dashboard-title-container">
                    <h2 className="dashboard-title">My Lists</h2>
                    <p className="btn submit-btn" onClick={this.showCreateListModal}>New List</p>
                </div>
                <CreateListModal 
                    display={this.state.createListModalDisplay} 
                    hideCreateListModal={this.hideCreateListModal}
                    handleCreateList={this.props.handleCreateList}
                    username={this.props.user.username} />
                <ListContainer 
                    lists={this.props.user.lists ? this.props.user.lists : null}
                    handleUpdateList={this.props.handleUpdateList}
                    handleDeleteList={this.props.handleDeleteList}
                    username={this.props.user.username} />
            </div>
        );
    }
}

export default UserDashboard;