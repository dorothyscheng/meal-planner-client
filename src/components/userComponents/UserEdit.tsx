import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import User from '../../models/User.interface';

interface Props {
    user: User | null,
    // error: string | null,
    handleUserEdit: (username: User['username'], user: User) => void,
}

interface State {
    username: string,
    passwordOld: string,
    passwordNew: string,
    passwordConfirm: string,
    email: string,
    familySize: string | number,
    error: string | null,
    redirect: boolean,
}

class UserEdit extends React.Component<Props, State> {
    state: State = {
    username: '',
    passwordOld: '',
    passwordNew: '',
    passwordConfirm: '',
    email: '',
    familySize: '',
    error: null,
    redirect: false,
    }

    handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            username: e.target.value,
        });
    }

    handlePasswordOldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const event = e.nativeEvent as InputEvent;
        const letter = event.data;
        let password = '';
        if (letter) {
            password = this.state.passwordOld + letter;
        } else {
            password = this.state.passwordOld.slice(0,this.state.passwordOld.length-1)
        };
        this.setState({
            passwordOld: password,
        });
    }

    handlePasswordNewChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const event = e.nativeEvent as InputEvent;
        const letter = event.data;
        let password = '';
        if (letter) {
            password = this.state.passwordNew + letter;
        } else {
            password = this.state.passwordNew.slice(0,this.state.passwordNew.length-1)
        };
        this.setState({
            passwordNew: password,
        });
    }

    handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const event = e.nativeEvent as InputEvent;
        const letter = event.data;
        let password = '';
        if (letter) {
            password = this.state.passwordConfirm + letter;
        } else {
            password = this.state.passwordConfirm.slice(0,this.state.passwordConfirm.length-1)
        };
        this.setState({
            passwordConfirm: password,
        });
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            email: e.target.value,
        });
    }

    handleFamilySizeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            familySize: e.target.value,
        });
    }

    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (this.props.user) {
            if (this.state.passwordOld !== this.props.user.password) {
                this.setState({
                    error: 'Authentication failed',
                });
            };
            if (this.state.passwordConfirm !== this.state.passwordNew) {
                this.setState({
                    error: 'Passwords must match',
                });
            };
            if (this.state.passwordOld === this.props.user.password && this.state.passwordConfirm === this.state.passwordNew) {
                let password = this.props.user.password;
                if (this.state.passwordNew !== '') {
                    password = this.state.passwordNew;
                };
                const updatedUser: User = {
                    username: this.state.username,
                    password: password,
                    email: this.state.email,
                    familySize: Number(this.state.familySize),
                }
                this.props.handleUserEdit(this.props.user.username, updatedUser);
                this.setState({
                    redirect: true,
                });
            };
        };
    }

    componentDidMount() {
        // console.log(this.props);
        if (this.props.user) {
            let familySize: State['familySize'] = '';
            if (this.props.user.familySize) {
                familySize = this.props.user.familySize;
            }
            this.setState({
                username: this.props.user.username,
                email: this.props.user.email,
                familySize: familySize,
            })
        }
    }

    render(): JSX.Element {
        if (this.state.redirect) return <Redirect to="/dashboard" />
        if (!this.props.user) return <h1>Loading...</h1>
        const passwordOldDisplay = this.state.passwordOld.split('').map(char => '*').join('');
        const passwordNewDisplay = this.state.passwordNew.split('').map(char => '*').join('');
        const passwordConfirmDisplay = this.state.passwordConfirm.split('').map(char => '*').join('');
        return (
            <div className="dashboard-container">
                <div className="dashboard-title-container">
                    <h1 className="dashboard-title">{this.props.user.username}</h1>
                </div>
                <form className="form">
                    {/* { this.props.error && <h3>{this.props.error}</h3> } */}
                    { this.state.error && <h3>{this.state.error}</h3> }
                    <label htmlFor="username">Username:</label>
                    <input 
                        name="username" 
                        type="text"
                        value={this.state.username}
                        onChange={this.handleUsernameChange} />

                    <label htmlFor="password">Current Password:</label>
                    <input 
                        name="password" 
                        type="text"
                        value={passwordOldDisplay}
                        onChange={this.handlePasswordOldChange} />

                    <label htmlFor="password">New Password:</label>
                    <input 
                        name="password" 
                        type="text"
                        value={passwordNewDisplay}
                        onChange={this.handlePasswordNewChange} />

                    <label htmlFor="passwordConfirm">Confirm New Password:</label>
                    <input 
                        name="passwordConfirm" 
                        type="text"
                        value={passwordConfirmDisplay}
                        onChange={this.handlePasswordConfirmChange} />

                    <label htmlFor="email">Email:</label>
                    <input 
                        name="email" 
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmailChange} />

                    <label htmlFor="familySize">How many are you cooking for?</label>
                    <input 
                        name="familySize" 
                        type="number"
                        value={this.state.familySize}
                        onChange={this.handleFamilySizeChange} />

                    <div className="actions">
                        <Link to="/dashboard" className="btn cancel-btn">Cancel</Link>
                        <button 
                            className="submit-btn" 
                            type="submit"
                            onClick={this.handleSubmit}
                            >Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UserEdit;